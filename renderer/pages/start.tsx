import { Component } from 'react'
import Layout from '../components/Layout';
import { IpcRendererEvent } from 'electron';

export default class extends Component {
  state = {
    input: '',
    message: null,
  }

  componentDidMount() {
    // start listening the channel message
    global.ipcRenderer.on('message', this.handleMessage)
  }

  componentWillUnmount() {
    // stop listening the channel message
    global.ipcRenderer.removeListener('message', this.handleMessage)
  }

  handleMessage = (_: IpcRendererEvent, message: string) => {
    // receive a message from the main process and save it in the local state
    this.setState({ message })
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    global.ipcRenderer.send('message', this.state.input)
    this.setState({ message: null })
  }

  render() {
    return (
      <Layout>
        <h1>Hello Electron!</h1>

        {this.state.message && <p>{this.state.message}</p>}

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>
        <style jsx>{`
          h1 {
            color: green;
            font-size: 50px;
          }
        `}</style>
      </Layout>
    )
  }
}
