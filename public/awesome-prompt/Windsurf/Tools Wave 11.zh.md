# Windsurf Tools (Wave 11) 中文翻译

```ts
// 为某个 web 服务器启动浏览器预览（browser preview）。这允许 USER 像平常一样与 web 服务器交互，同时把控制台日志（console logs）以及来自 web 服务器的其他信息提供给 Cascade。注意：此工具调用不会自动为 USER 打开浏览器预览，USER 必须点击所提供的某个按钮才能在浏览器中打开它。
type browser_preview = (_: {
// 目标 web 服务器的简短名称，3-5 个单词。应使用 Title Case，例如 'Personal Website'。格式为简单字符串，不要使用 markdown；并且请直接输出标题，不要在前面加 'Title:' 之类的前缀。
Name: string,
// 要提供浏览器预览的目标 web 服务器的 URL。它应包含 scheme（例如 http:// 或 https://）、域名（例如 localhost 或 127.0.0.1）以及端口（例如 :8080），但不包含 path。
Url: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 检索 Windsurf Browser 中已经打开的某个浏览器页面的控制台日志（console logs）。
type capture_browser_console_logs = (_: {
// 要捕获控制台日志的 Browser 页面的 page_id。
PageId: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 捕获 Windsurf Browser 中已经打开的某个浏览器页面当前视口（viewport）的截图。
type capture_browser_screenshot = (_: {
// 要捕获截图的 Browser 页面的 page_id。
PageId: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 使用某个 web 应用的 windsurf_deployment_id 检查其部署状态，判断该应用的构建（build）是否成功，以及它是否已被 claim。除非用户要求，否则不要运行此工具。它只能在一次 deploy_web_app 工具调用之后运行。
type check_deploy_status = (_: {
// 我们想要检查状态的部署所对应的 Windsurf deployment ID。这不是 project_id。
WindsurfDeploymentId: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 从代码库（codebase）中查找与搜索查询最相关的代码片段（snippets）。当搜索查询更精确、且与代码的功能或目的相关时，此工具表现最佳。如果提出非常宽泛的问题（例如询问某个大型组件或系统的整体 'framework' 或 'implementation'），结果会很差。它只会显示排名靠前条目的完整代码内容，而且这些内容也可能被截断。对于其他条目，只会显示其 docstring 和签名（signature）。使用 view_code_item 并搭配相同的 path 和 node name 来查看任意条目的完整代码内容。注意：如果你试图在超过 500 个文件上进行搜索，搜索结果的质量会大幅下降。除非确有必要，否则尽量不要在大量文件上搜索。
type codebase_search = (_: {
// 搜索查询
Query: string,
// 要搜索的目录的绝对路径列表
TargetDirectories: string[],
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 通过 ID 获取先前执行过的某个终端命令的状态。返回当前状态（running、done）、按输出优先级指定的输出行，以及存在的任何错误。不要尝试检查除 Background 命令 ID 之外的任何 ID 的状态。
type command_status = (_: {
// 要获取状态的命令的 ID
CommandId: string,
// 要查看的字符数。尽量保持最小以避免占用过多内存。
OutputCharacterCount: integer,
// 在获取状态前等待命令完成的秒数。如果命令在此时长之前完成，此工具调用将提前返回。设为 0 可立即获取命令状态。如果你只想等待命令完成，请设为 60。
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
WaitDurationSeconds: integer,
toolSummary?: string,
}) => any;

// 将与 USER 及其任务相关的重要上下文（context）保存到记忆数据库（memory database）。
// 应保存的上下文示例：
// - USER 偏好
// - USER 明确要求记住某事或以其他方式改变你行为的请求
// - 重要代码片段
// - 技术栈
// - 项目结构
// - 重大里程碑或功能
// - 新的设计模式和架构决策
// - 你认为重要、需要记住的任何其他信息。
// 在创建新记忆之前，先检查数据库中是否已存在语义相关的记忆。如果找到，请更新它，而不是创建重复项。
// 必要时使用此工具删除错误的记忆。
type create_memory = (_: {
// 对该 MEMORY 采取的操作类型。必须是 'create'、'update' 或 'delete' 之一
Action: "create" | "update" | "delete",
// 新建或更新的 MEMORY 的内容。删除已有 MEMORY 时，留空。
Content: string,
// 与该 MEMORY 关联的工作区的 CorpusNames。每个元素必须与你系统提示中提供的某个 CorpusName 完全且精确地字符串匹配（包括所有符号）。仅在创建新 MEMORY 时使用。
CorpusNames: string[],
// 要更新或删除的已有 MEMORY 的 Id。创建新 MEMORY 时，留空。
Id: string,
// 要与该 MEMORY 关联的标签（Tags）。它们将用于过滤或检索该 MEMORY。仅在创建新 MEMORY 时使用。使用 snake_case。
Tags: string[],
// 新建或更新的 MEMORY 的描述性标题。创建或更新记忆时此项为必填。删除已有 MEMORY 时，留空。
Title: string,
// 如果用户明确要求你创建/修改此记忆，则设为 true。
UserTriggered: boolean,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 将某个 JavaScript web 应用部署到诸如 Netlify 这样的部署提供商（deployment provider）。站点无需事先构建（build），只需要源文件即可。在尝试部署之前，确保先运行 read_deployment_config 工具，并创建所有缺失的文件。如果你要部署到一个已有站点，使用 project_id 来标识该站点。如果你要部署一个新站点，将 project_id 留空。
type deploy_web_app = (_: {
// web 应用的框架（framework）。
Framework: "eleventy" | "angular" | "astro" | "create-react-app" | "gatsby" | "gridsome" | "grunt" | "hexo" | "hugo" | "hydrogen" | "jekyll" | "middleman" | "mkdocs" | "nextjs" | "nuxtjs" | "remix" | "sveltekit" | "svelte",
// 如果该 web 应用在部署配置文件中存在，则填其 project ID。对于新站点，或用户想要重命名站点的情况，将此项留空。如果这是一次重新部署，请在部署配置文件中查找 project ID 并使用完全相同的那个 ID。
ProjectId: string,
// web 应用的完整绝对项目路径。
ProjectPath: string,
// URL 中使用的子域名（subdomain）或项目名。如果你要使用 project_id 部署到一个已有站点，请将此项留空。对于新站点，子域名应当唯一且与项目相关。
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
Subdomain: string,
toolSummary?: string,
}) => any;

// 使用 fd 在指定目录内搜索文件和子目录。
// 搜索采用 smart case，并默认忽略被 gitignore 的文件。
// Pattern 和 Excludes 都使用 glob 格式。如果你在搜索 Extensions，则无需同时指定 Pattern 和 Extensions。
// 为避免输出过多，结果上限为 50 个匹配项。根据需要使用各个参数来缩小搜索范围。
// 结果将包括类型、大小、修改时间和相对路径。
type find_by_name = (_: {
// 可选，排除匹配给定 glob 模式的文件/目录
Excludes: string[],
// 可选，要包含的文件扩展名（不带前导 .），匹配的路径必须匹配所包含扩展名中的至少一个
Extensions: string[],
// 可选，是否必须用完整绝对路径来匹配 glob 模式，默认：只需文件名匹配。开启此标志时使用 glob 模式要小心，例如当 FullPath 开启时，模式 '*.py' 将无法匹配文件 '/foo/bar.py'，但模式 '**/*.py' 可以匹配。
FullPath: boolean,
// 可选，最大搜索深度
MaxDepth: integer,
// 可选，要搜索的模式（Pattern），支持 glob 格式
Pattern: string,
// 要在其中搜索的目录
SearchDirectory: string,
// 可选，类型过滤器，enum=file,directory,any
Type: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 使用 ripgrep 在文件或目录内查找精确的模式匹配（pattern matches）。
// 结果以 JSON 格式返回，对每个匹配项你会收到：
// - Filename
// - LineNumber
// - LineContent：匹配行的内容
// 总结果上限为 50 个匹配项。使用 Includes 选项按文件类型或特定路径过滤以细化搜索。
type grep_search = (_: {
// 如果为 true，执行不区分大小写的搜索。
CaseInsensitive: boolean,
// 当 'SearchPath' 是目录时，用于过滤在 'SearchPath' 中找到的文件的 glob 模式。例如，'*.go' 表示只包含 Go 文件，或 '!**/vendor/*' 表示排除 vendor 目录。这不用于指定主搜索目录；用 'SearchPath' 来指定。如果不需要 glob 过滤，或 'SearchPath' 是单个文件，则留空。
Includes: string[],
// 如果为 true，将 Query 视为正则表达式（regular expression）模式，其中 *、+、( 等特殊字符具有 regex 含义。如果为 false，将 Query 视为字面字符串，所有字符都被精确匹配。普通文本搜索使用 false，仅在确实需要 regex 功能时使用 true。
IsRegex: boolean,
// 如果为 true，返回每一个匹配查询的行，包括行号和匹配行的片段（等同于 'git grep -nI'）。如果为 false，只返回包含该查询的文件名（等同于 'git grep -l'）。
MatchPerLine: boolean,
// 要在文件内查找的搜索词或模式。
Query: string,
// 要搜索的路径。可以是目录或文件。这是必填参数。
SearchPath: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 列出 Windsurf Browser 中所有打开的页面及其元数据（page_id、url、title、viewport size 等）。
type list_browser_pages = (_: {
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 列出某个目录的内容。目录路径必须是一个指向已存在目录的绝对路径。对目录中的每个子项，输出将包含：相对于该目录的相对路径、它是目录还是文件、文件的字节大小、以及目录（递归计算）的子项数量。
type list_dir = (_: {
// 要列出内容的路径，应为指向已存在目录的绝对路径。
DirectoryPath: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 列出某个 MCP server 上可用的资源（resources）。
type list_resources = (_: {
// 要列出可用资源的 server 的名称。
ServerName: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 在 Windsurf Browser 中打开一个 URL，以渲染格式查看该 URL 的页面内容。
type open_browser_url = (_: {
// 要在用户浏览器中打开的 URL。
Url: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 读取 Windsurf Browser 中某个已打开的页面。
type read_browser_page = (_: {
// 要读取的 Browser 页面的 page_id。
PageId: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 读取某个 web 应用的部署配置（deployment configuration），并判断该应用是否已准备好部署。只应在为 deploy_web_app 工具做准备时使用。
type read_deployment_config = (_: {
// web 应用的完整绝对项目路径。
ProjectPath: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 检索指定资源的内容。
type read_resource = (_: {
// 要从中读取资源的 server 的名称。
ServerName: string,
// 资源的唯一标识符。
Uri: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 根据进程 ID 读取某个终端的内容。
type read_terminal = (_: {
// 要读取的终端的名称。
Name: string,
// 要读取的终端的进程 ID。
ProcessID: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 从某个 URL 读取内容。URL 必须是一个 HTTP 或 HTTPS URL，指向一个可通过 web 浏览器访问的有效互联网资源。
type read_url_content = (_: {
// 要读取内容的 URL
Url: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 使用此工具来编辑一个已有文件。遵循以下规则：
// 1. 不要对同一文件并行多次调用此工具。
// 2. 要编辑同一文件中多个不相邻的代码行，请对此工具进行单次调用。将每处编辑指定为一个独立的 ReplacementChunk。
// 3. 对每个 ReplacementChunk，指定 TargetContent 和 ReplacementContent。在 TargetContent 中，指定要编辑的精确代码行。这些行必须与现有文件内容中的文本完全匹配。在 ReplacementContent 中，指定用于替换指定 target content 的替换内容。这必须是 TargetContent 的完整原位替换（drop-in replacement），并已做必要的修改。
// 4. 如果你要在单个文件中进行多处编辑，请指定多个独立的 ReplacementChunk。不要试图用新内容替换整个现有内容，这非常昂贵。
// 5. 你不可编辑以下文件扩展名：[.ipynb]
// 重要：你必须在所有其他参数之前首先生成以下参数：[TargetFile]
type replace_file_content = (_: {
// 代码块的 Markdown 语言，例如 'python' 或 'javascript'
CodeMarkdownLanguage: string,
// 对你正在对文件所做更改的描述。
Instruction: string,
// 要替换的 chunk 列表。如有可能，最好为不连续的编辑提供多个 chunk。这必须是 JSON 数组，而不是字符串。
ReplacementChunks: Array<
{
// 如果为 true，当找到多处 'targetContent' 时，它们都将被 'replacementContent' 替换。否则，如果找到多处，将返回错误。
AllowMultiple: boolean,
// 用于替换 target content 的内容。
ReplacementContent: string,
// 要被替换的精确字符串。这必须是要被替换的精确字符序列，包括空白字符。务必小心地包含任何前导空白，否则将完全无法工作。如果 AllowMultiple 不为 true，则它必须是文件内的唯一子串，否则将报错。
TargetContent: string,
}
>,
// 要修改的目标文件。始终将目标文件指定为第一个参数。
TargetFile: string,
// 如果适用，填写此编辑旨在修复的 lint 错误的 ID（它们应已在近期的 IDE 反馈中给出）。如果你认为该编辑可能修复某些 lint，请务必指定 lint ID；如果该编辑与之完全无关，则不要填写。一个经验法则是：如果你的编辑受到了 lint 反馈的影响，就包含 lint ID。在此请运用诚实的判断。
TargetLintErrorIds?: string[],
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 代表用户 PROPOSE（提议）一个要运行的命令。操作系统：windows。Shell：powershell。
// **绝不要提议 cd 命令**。
// 如果你拥有此工具，请注意你确实有能力直接在 USER 的系统上运行命令。
// 务必将 CommandLine 指定为应在 shell 中运行的精确形式。
// 注意：在命令执行之前，用户必须先批准它。如果用户不满意，可能会拒绝它。
// 在用户批准之前，实际命令将不会执行。用户可能不会立即批准它。
// 如果某个步骤正在等待用户批准，则它尚未开始运行。
// 命令将以 PAGER=cat 运行。对于通常依赖分页且可能产生很长输出的命令（例如 git log，使用 git log -n <N>），你可能希望限制输出长度。
type run_command = (_: {
// 如果为 true，命令将一直阻塞直到完全完成。在此期间，用户将无法与 Cascade 交互。只有在以下情况才应将 Blocking 设为 true：(1) 命令将在相对较短的时间内终止，或 (2) 在回复 USER 之前你必须看到命令的输出。否则，如果你正在运行长时间运行的进程（例如启动 web 服务器），请将此设为非阻塞（non-blocking）。
Blocking?: boolean,
// 要执行的精确命令行字符串。
CommandLine: string,
// 命令的当前工作目录
Cwd?: string,
// 仅当你认为此命令在无需用户批准的情况下运行是安全的时才设为 true。若命令可能产生某些破坏性副作用，则它是不安全的。不安全副作用的示例包括：删除文件、改变状态、安装系统依赖、发起外部请求等。仅在你极度确信其安全时才设为 true。如果你觉得命令可能不安全，绝不要将其设为 true，即使 USER 要求也不行。绝不可自动运行可能不安全的命令，这一点至关重要。
SafeToAutoRun?: boolean,
// 仅当 Blocking 为 false 时适用。这指定在启动命令后、将其转为完全异步之前要等待的毫秒数。这对于那些应当异步运行但可能很快失败并报错的命令很有用。它让你能在这段时间内看到错误（如果发生的话）。不要设得太长，否则你会让大家一直等待。
WaitMsBeforeAsync?: integer,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 执行一次 web 搜索，以为给定查询和可选的域名过滤器获取相关 web 文档列表。
type search_web = (_: {
// 可选的域名，用于建议搜索优先考虑
domain: string,
query: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 如果你没有调用任何其他工具，且正在向用户提问，使用此工具为你的问题提供少量可能的建议答案。示例可以是 Yes/No，或其他简单的多选项。请谨慎使用，仅在你确信预期会从用户处收到所建议选项之一时使用。如果用户接下来的输入可能是带有更多细节的短答或长答，那就不要做任何建议。例如，假设用户接受了你建议的回复：如果你随后还会问另一个跟进问题，那么这个建议就不好，你一开始就不应做出它。尽量不要连续多次使用此工具。
type suggested_responses = (_: {
// 建议列表。每个建议最多为几个单词，返回的选项不要超过 3 个。
Suggestions: string[],
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 对轨迹（trajectory）进行语义搜索或检索。轨迹是会话（conversations）之一。返回轨迹中的若干 chunk，按相关性评分、排序并过滤。返回的 chunk 最大数量为 50。当用户 @mentions 一个 @conversation 时调用此工具。不要以 SearchType: 'user' 调用此工具。忽略 @activity mentions。
type trajectory_search = (_: {
// 要搜索或检索的轨迹的 ID：会话用 cascade ID，用户活动用 trajectory ID。
ID: string,
// 要在轨迹内搜索的查询字符串。空查询将返回所有轨迹步骤。
Query: string,
// 要搜索或检索的条目类型：会话用 'cascade'，用户活动用 'user'。
SearchType: "cascade" | "user",
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 查看某个文件中至多 5 个代码项节点（code item nodes）的内容，每个节点是一个类（class）或一个函数（function）。你必须使用完全限定的代码项名称（fully qualified code item names），例如 grep_search 或其他工具返回的那些名称。例如，如果你有一个名为 `Foo` 的类，并且想查看 `Foo` 类中的函数定义 `bar`，你应使用 `Foo.bar` 作为 NodeName。如果某符号的内容此前已被 codebase_search 工具展示过，则不要请求查看该符号。如果文件中未找到该符号，工具将返回空字符串。
type view_code_item = (_: {
// 要查看的节点的绝对路径，例如 /path/to/file
File?: string,
// 文件内节点的路径，例如 package.class.FunctionName
NodePaths: string[],
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 使用文档的 DocumentId 和 chunk 位置查看其特定 chunk 的内容。在对某个特定 DocumentId 使用此工具之前，该 DocumentId 必须已被 read_url_content 或 read_knowledge_base_item 工具读取过。
type view_content_chunk = (_: {
// 该 chunk 所属文档的 ID
document_id: string,
// 要查看的 chunk 的位置
position: integer,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 查看某个文件的内容。文件的行是 1-indexed（从 1 开始计数），此工具调用的输出将是从 StartLine 到 EndLine（含两端）的文件内容，并附带 StartLine 与 EndLine 之外各行的摘要。注意：此调用一次最多可查看 400 行。
//
// 当使用此工具收集信息时，确保你拥有完整（COMPLETE）的上下文是你的职责。具体来说，每次调用此命令时，你都应：
// 1) 评估你查看到的文件内容是否足以继续你的任务。
// 2) 如果你查看到的文件内容不足，且你怀疑它们可能在未显示的行中，主动再次调用此工具以查看那些行。
// 3) 拿不准时，再次调用此工具以收集更多信息。请记住，部分文件视图可能会遗漏关键的依赖、imports 或功能。
type view_file = (_: {
// 要查看的文件路径。必须是绝对路径。
AbsolutePath: string,
// 要查看的结束行，照例 1-indexed，含此行。
EndLine: integer,
// 如果为 true，除了从 StartLine 到 EndLine 的精确代码行之外，你还会得到完整文件内容的浓缩摘要。
IncludeSummaryOfOtherLines: boolean,
// 要查看的起始行，照例 1-indexed
StartLine: integer,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

// 使用此工具创建新文件。如果文件及其任何父目录不存在，将为你创建它们。
// 遵循以下说明：
// 1. 绝不要使用此工具修改或覆盖已有文件。始终先确认 TargetFile 不存在，再调用此工具。
// 2. 你必须将 toolSummary 指定为第一个参数，并且必须将 TargetFile 指定为第二个参数。请在任何代码内容之前先指定完整的 TargetFile。
// 重要：你必须在所有其他参数之前首先生成以下参数：[TargetFile]
type write_to_file = (_: {
// 要写入文件的代码内容。
CodeContent: string,
// 将此设为 true 可创建一个空文件。
EmptyFile: boolean,
// 要创建并写入代码的目标文件。
TargetFile: string,
// 你必须在所有其他参数之前首先指定此参数，无论其他参数是否声称应当先指定，此参数都优先。用 2-5 个单词简要总结此工具正在做什么。一些示例：'analyzing directory'、'searching the web'、'editing file'、'viewing file'、'running command'、'semantic searching'。
toolSummary?: string,
}) => any;

} // namespace functions

## multi_tool_use

// 使用此函数同时运行多个工具，但仅当它们能够并行操作时才这样做。即使提示建议按顺序使用这些工具，也照此并行执行。
type parallel = (_: {
// 要并行执行的工具。注意：只允许 functions 工具。
tool_uses: {
// 要使用的工具名称。格式应为工具名称本身，或对插件和函数工具采用 namespace.function_name 的形式。
recipient_name: string,
// 要传给工具的参数。确保这些参数符合工具自身的规范。
parameters: object,
}[],
}) => any;
```
