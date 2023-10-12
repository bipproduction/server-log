export interface PM2_LIST {
    pid: number
    name: string
    pm2_env: Pm2Env
    pm_id: number
    monit: Monit
}

export interface Pm2Env {
    kill_retry_time: number
    windowsHide: boolean
    username: string
    treekill: boolean
    automation: boolean
    pmx: boolean
    instance_var: string
    watch: boolean
    autorestart: boolean
    vizion: boolean
    merge_logs: boolean
    env: Env
    args: string[]
    namespace: string
    filter_env: any[]
    name: string
    node_args: any[]
    pm_exec_path: string
    pm_cwd: string
    exec_interpreter: string
    exec_mode: string
    instances: number
    pm_out_log_path: string
    pm_err_log_path: string
    pm_pid_path: string
    km_link: boolean
    vizion_running: boolean
    NODE_APP_INSTANCE: number
    NVM_INC: string
    MANPATH: string
    TERM_PROGRAM: string
    PYENV_ROOT: string
    NVM_CD_FLAGS: string
    TERM: string
    SHELL: string
    HOMEBREW_REPOSITORY: string
    TMPDIR: string
    TERM_PROGRAM_VERSION: string
    ORIGINAL_XDG_CURRENT_DESKTOP: string
    MallocNanoZone: string
    NVM_DIR: string
    USER: string
    COMMAND_MODE: string
    SSH_AUTH_SOCK: string
    __CF_USER_TEXT_ENCODING: string
    PATH: string
    LaunchInstanceID: string
    __CFBundleIdentifier: string
    PWD: string
    EDITOR: string
    LANG: string
    VSCODE_GIT_ASKPASS_EXTRA_ARGS: string
    XPC_FLAGS: string
    XPC_SERVICE_NAME: string
    SHLVL: string
    PYENV_SHELL: string
    HOME: string
    VSCODE_GIT_ASKPASS_MAIN: string
    HOMEBREW_PREFIX: string
    LOGNAME: string
    VSCODE_GIT_IPC_HANDLE: string
    NVM_BIN: string
    VSCODE_GIT_ASKPASS_NODE: string
    GIT_ASKPASS: string
    HOMEBREW_CELLAR: string
    INFOPATH: string
    SECURITYSESSIONID: string
    COLORTERM: string
    _: string
    PM2_USAGE: string
    PM2_HOME: string
    unique_id: string
    status: string
    pm_uptime: number
    axm_actions: any[]
    axm_monitor: AxmMonitor
    axm_options: AxmOptions
    axm_dynamic: AxmDynamic
    created_at: number
    pm_id: number
    restart_time: number
    unstable_restarts: number
    version: string
    versioning: any
    prev_restart_delay: number
    exit_code: number
}

export interface Env {
    NVM_INC: string
    MANPATH: string
    TERM_PROGRAM: string
    PYENV_ROOT: string
    NVM_CD_FLAGS: string
    TERM: string
    SHELL: string
    HOMEBREW_REPOSITORY: string
    TMPDIR: string
    TERM_PROGRAM_VERSION: string
    ORIGINAL_XDG_CURRENT_DESKTOP: string
    MallocNanoZone: string
    NVM_DIR: string
    USER: string
    COMMAND_MODE: string
    SSH_AUTH_SOCK: string
    __CF_USER_TEXT_ENCODING: string
    PATH: string
    LaunchInstanceID: string
    __CFBundleIdentifier: string
    PWD: string
    EDITOR: string
    LANG: string
    VSCODE_GIT_ASKPASS_EXTRA_ARGS: string
    XPC_FLAGS: string
    XPC_SERVICE_NAME: string
    SHLVL: string
    PYENV_SHELL: string
    HOME: string
    VSCODE_GIT_ASKPASS_MAIN: string
    HOMEBREW_PREFIX: string
    LOGNAME: string
    VSCODE_GIT_IPC_HANDLE: string
    NVM_BIN: string
    VSCODE_GIT_ASKPASS_NODE: string
    GIT_ASKPASS: string
    HOMEBREW_CELLAR: string
    INFOPATH: string
    SECURITYSESSIONID: string
    COLORTERM: string
    _: string
    PM2_USAGE: string
    PM2_HOME: string
    ex_5001: Ex5001
    unique_id: string
}

export interface Ex5001 { }

export interface AxmMonitor { }

export interface AxmOptions { }

export interface AxmDynamic { }

export interface Monit {
    memory: number
    cpu: number
}