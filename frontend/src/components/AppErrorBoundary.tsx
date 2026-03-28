import { type ReactNode, Component } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error: Error | null }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-[#02040a] text-emerald-50 flex items-center justify-center p-6">
          <div className="max-w-md rounded-2xl border border-red-500/50 bg-black/80 p-6 shadow-lg">
            <h1 className="text-lg font-semibold text-red-300 mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-300 mb-4 font-mono break-all">
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-emerald-500/80 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-400"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
