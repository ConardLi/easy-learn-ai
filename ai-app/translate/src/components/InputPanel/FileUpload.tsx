/**
 * 文件上传组件
 * 处理多种格式文件的上传和内容提取
 */
import React, { useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { DocumentIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';
import { TranslationService, ApiError } from '../../services/translationService';

interface FileUploadProps {
  onTranslate: (text?: string, fileId?: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onTranslate }) => {
  const [config] = useAtom(userConfigAtom);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supportedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
    'image/png'
  ];
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !config.apiKey) return;
    
    setUploadError(null);
    
    // 检查文件大小
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('文件大小不能超过 10MB');
      return;
    }
    
    // 检查文件类型
    if (!supportedTypes.includes(file.type)) {
      setUploadError('不支持的文件格式');
      return;
    }
    
    setUploading(true);
    
    try {
      // 如果是文本文件，直接读取内容
      if (file.type === 'text/plain') {
        const text = await file.text();
        onTranslate(text);
      } else {
        // 其他格式上传到服务器处理
        const uploadResult = await TranslationService.uploadFile(file, config.apiKey);
        // 使用文件ID而不是文件名
        onTranslate(undefined, uploadResult.file_id);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setUploadError(`文件处理失败: ${error.message}`);
      } else {
        setUploadError(`文件处理失败: ${(error as Error).message}`);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        或上传文件翻译
      </label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          disabled={uploading || !config.apiKey}
          className="hidden"
        />
        
        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || !config.apiKey}
            className="text-blue-500 hover:text-blue-600 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? '上传并翻译中...' : '点击选择文件'}
          </button>
          
          <p className="text-sm text-gray-500">
            支持 PDF、DOC、XLS、PPT、TXT、JPG、PNG 格式
          </p>
          <p className="text-xs text-gray-400">
            文件大小限制：10MB
          </p>
          
          {uploadError && (
            <p className="text-sm text-red-600 mt-2">
              ❌ {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};