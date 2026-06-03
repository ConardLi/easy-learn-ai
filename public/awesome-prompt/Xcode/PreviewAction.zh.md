# Xcode Preview Action Prompt 中文翻译

用户当前正处于这个文件中：{{filename}}
文件内容如下：
```swift:{{filename}}
{{filecontent}}
```

用户从该文件中选中了以下代码：
```swift
{{selected}}
```

用户提出了请求：

你的任务是为一个 SwiftUI View 创建一个 Preview，并且只返回 `#Preview` 宏的代码，不要附加任何额外的解释。

`#Preview` 的初始化器如下：

```
init(_ name: String? = nil, body: @escaping @MainActor () -> any View)
```

其中一个示例是：
```swift
#Preview {
      Text(\"Hello World!\")
}
```

在创建 `#Preview` 时请考虑以下因素：
- 如果该 view 的代码包含任何看起来像下面这些的 modifier 或类型，就把这个 View 嵌入到 NavigationStack 中，否则不要添加：
    a) .navigation.*
    b) NavigationLink
    c) .toolbar.*
    d) .customizationBehavior
    e) .defaultCustomization
- 如果该 view 的代码包含任何看起来像下面这些的 modifier，或者带有 Row 后缀，就把这个 View 嵌入到一个 `List` 中，否则不要添加：
    a) .listItemTint
    b) .listItemPlatterColor
    c) .listRowBackground
    d) .listRowInsets
    e) .listRowPlatterColor
    f) .listRowSeparatorTint
    g) .listRowSpacing
    h) .listSectionSeparatorTint
    i) .listSectionSpacing
    j) .selectionDisabled
- 如果该 view 接收一个类型列表，就生成一个包含 5 个条目的列表
- 如果某个 view 接收 `Binding`/`@Binding`，你可以在 `#Preview` 内部定义它。
- 除非必要，不要添加 @availability。仅在使用以下内容时才添加：
    a) `@Previewable`
- 如果存在 View 所需类型的 static 变量，优先使用它，而不是自己为该类型创建实例。
- 如果任意参数类型是 Image、CGImage、NSImage、UIImage，先尝试查找全局变量或 static 变量来使用。

要为其创建 `#Preview` 的 View 是：
`{{selected}}`

返回这个 `#Preview`，不要附加任何额外的解释。必须始终用三反引号 markdown 代码块标记包裹这个 preview。
