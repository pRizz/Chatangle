<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            <img src="./assets/logo.png" alt="logo" width="28" height="28" style="margin-right: 6px">
            <h1 class="heading title"></h1>
            <h1 class="heading title is-4">Chatangle (Beta)</h1>
          </router-link>
          <div class="navbar-burger" v-bind:class="{ 'is-active': navVisible }" @click="navVisible = !navVisible">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active': navVisible }">
          <div class="navbar-start">

          </div>
          <div class="navbar-end">
            <a href="https://github.com/pRizz/Chatangle" class="navbar-item" target="_blank">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>&nbsp;Github</span>
            </a>

            <div class="navbar-item">
              {{ clientCount.toLocaleString() }} Users Online
            </div>
            <div class="navbar-item">
              <b-dropdown @change="connectToIOTA" v-model="iota.provider" position="is-bottom-left">

                <button type="button" slot="trigger" class="button" :class="{
                    'is-loading': iota.status === 'Connecting',
                    'is-primary-purple': iota.status === 'Connected',
                    'is-danger': iota.status === 'Failed'}">
                  <span> {{ this.iota.status }} </span>
                  <span class="icon">
                    <i class="fas fa-caret-down"></i>
                  </span>
                </button>

                <b-dropdown-item custom>
                  <h1 class="title is-6">Latest Milestone:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" readonly :value="iota.latestMilestone"></b-input>
                    <p class="control">
                      <button class="button is-primary-purple" v-clipboard:copy="iota.latestMilestone">Copy</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
                <b-dropdown-item custom>
                  <h1 class="title is-6">Latest Solid Milestone:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" readonly :value="iota.latestSolidMilestone"></b-input>
                    <p class="control">
                      <button class="button is-primary-purple" v-clipboard:copy="iota.latestSolidMilestone">Copy</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
                <b-dropdown-item custom>
                  Node version: <b>{{ iota.version || "..." }}</b>
                </b-dropdown-item>
                <b-dropdown-item custom>
                  Node health: <b>{{ providerHealth }}</b>
                </b-dropdown-item>
                <hr class="dropdown-divider">
                <div v-for="prov in providerList">
                  <b-dropdown-item :value="prov">
                    <div class="media">
                      <span v-if="prov.includes('https:')" class="media-left icon">
                        <i class="mdi mdi-lock"></i>
                      </span>
                      <span v-else class="media-left icon">
                        <i class="fa fa-wifi"></i>
                      </span>
                      <div class="media-content">
                        <h3>{{ prov }}</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                </div>
                <b-dropdown-item custom>
                  <h1 class="title is-6">Custom Provider:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" v-model.sync="customProvider"></b-input>
                    <p class="control">
                      <button class="button is-primary-purple" @click="addProvider">Add</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
              </b-dropdown>

            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :iota="iota.link" :channel-controller="channelController" :message-sender-delegate="this" :isWebGL2Supported="this.isWebGL2Supported"></router-view>

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="heading title is-4">Chatangle</h1>
            <h1 class="subtitle is-6">A free, decentralized, global chatroom, powered by the IOTA tangle. Can your blockchain do this?</h1>
            <h1 class="subtitle is-6">IOTA is a cryptocurrency that offers free transactions and fast confirmation times. ​
              Using Chatangle actually improves IOTA confirmation times. <a href="https://iota.org/" target="_blank">Find out more at their website</a>.</h1>
            <h1 class="subtitle is-6">This app is naturally spam resistant and rate limited as each message requires Proof of Work to submit.</h1>
          </div>
          <div class="column">
            <p>
              Utilizes <a href="https://vuejs.org/" target="_blank">Vue.js</a>, <a href="https://buefy.github.io/" target="_blank">Buefy</a>, <a href="https://bulma.io/" target="_blank">Bulma</a>, and <a href="https://nodejs.org/" target="_blank">Node.js</a>. Front-end adapted from <a href="https://github.com/lsquires/open-iota" target="_blank">Open IOTA</a>; thanks to Laurence Squires, for allowing me to fork his code. Thanks to the fine people on the IOTA Slack for pointing me in the right direction.
            </p>
            <br/>
            <p>View source code at
              <a href="https://github.com/pRizz/Chatangle" class="button is-small" target="_blank">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>&nbsp;Github</span>
            </a>
            </p>
          </div>
          <div class="column">
            <p>Copyright © 2017 Peter Ryszkiewicz</p>
            <p>MIT License</p>
            <p><a target="_blank" href="/static/PrivacyPolicy.txt">Privacy Policy</a></p>
            <br/>
            <p>Check out my other crypto projects at <a href="https://prizziota.com" target="_blank">prizziota.com</a></p>
            <p>Chatangle is hosted by <a href="https://www.prizzventuresllc.com" target="_blank">P Rizz Ventures LLC</a></p>
            <p>More projects to come...</p>
          </div>
        </div>

        <div class="has-text-centered">
          <p>If you like this app and want to support me making more apps, please consider tipping me at these addresses:</p>
          <div>
            IOTA: <code style="color: blue; overflow-wrap: break-word; ">{{ pRizzTipAddresses.IOTA }}</code>
          </div>
          <div>
            NANO:
            <code style="color: blue; overflow-wrap: break-word;">{{ pRizzTipAddresses.NANO }}</code>
          </div>
          <div>
            Thanks for your support!
          </div>
        </div>
      </div>
    </footer>

    <b-modal :active.sync="isProviderModalActive">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Changing IOTA Server</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div>
            Doing this will open this website in another tab.
          </div>
          <br/>
          <div>
            The technical reason for this is that when you interact with an <code>http</code> server, but the website itself is served over <code>https</code>, the requests will be blocked by the web browser. (This is a security feature built into web browsers.) Therefore, you must go to the <code>http</code> version of this website to interact with <code>http</code> IOTA servers.
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="openHTTPSite">OK</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import IOTA from 'iota.lib.js'
  import TryteCodec from 'tryte-utf8-json-codec'
  import ChatangleCodec from 'chatangle-codec'
  import curlTransaction from 'curl-transaction-core'
  import curlImpl from 'curl-transaction-webgl2-impl'
  import pRizzTipAddresses from 'prizz-tip-addresses'

  console.log('initializing App')

  let localAttachToTangle = null

  const chatangleBackendURL = `${process.env.IS_CHATANGLE_BACKEND_SECURED ? 'wss' : 'ws'}://${process.env.CHATANGLE_BACKEND_IP}:${process.env.CHATANGLE_BACKEND_PORT}`
  let messageKeyCount = 0

  function getDefaultMessage() {
    return {
      name: 'Peter Ryszkiewicz',
      message: 'Welcome to Chatangle! 🎉🎈🍾 A free, decentralized, global chatroom, powered by the IOTA tangle! Broadcast a message to the world using the controls above. You can create new channels or join channels using the Channel pane on the left. Proof of messages can be seen by clicking on the transaction hash below the message.',
      txHash: 'RJTKMGXQUFPRHAZXRGSIMMJXQEYQVQJCTWVSCNVADMYZUNOZAAVGAJSWWNFUWAYAPMOJSBDJYJK999999',
      date: Date.now(),
      key: messageKeyCount++
    }
  }

  // public node list from IOTA's mainnet nodes, https://iotasupport.com/providers.json, and http://iotanode.host/
  let defaultProviderList = [
    // http nodes
    'http://eugene.iota.community:14265',
    'http://node01.iotatoken.nl:14265',
    'http://node02.iotatoken.nl:14265',
    'http://node03.iotatoken.nl:14265',
    'http://mainnet.necropaz.com:14500',
    'http://node.lukaseder.de:14265',
    'http://iota-node-nelson.prizziota.com:80',
    // https nodes
    'https://iota-node-nelson.prizziota.com:443',
    'https://iotanode.us:443',
    'https://iri2-api.iota.fm:443',
    'https://iri3-api.iota.fm:443',
    'https://nelson1-api.iota.fm:443',
    'https://node.iota-community.org:443',
    'https://node.iota.dance:443',
    'https://node.neffware.com:443',
    'https://node1.iotaner.org:443',
    'https://nodes.iota.cafe:443',
    'https://wallet1.iota.town:443',
    'https://wallet2.iota.town:443',
  ]

  let initialProvider = 'https://iota-node-nelson.prizziota.com:443'

  if(process.env.IOTA_PROVIDERS_JSON) {
    try {
      const iotaProviders = JSON.parse(process.env.IOTA_PROVIDERS_JSON)
      if(!Array.isArray(iotaProviders)) { throw 0 }
      if(iotaProviders.length <= 0) { throw 0 }
      iotaProviders.forEach((iotaProvider) => { new URL(iotaProvider) })
      defaultProviderList = iotaProviders
      initialProvider = iotaProviders[0]
    } catch(e) {
      console.log('Invalid IOTA_PROVIDERS_JSON supplied: ', e)
    }
  }

  export default {
    name: 'app',
    data () {
      let globalChannel = {
        name: 'Global',
        messages: [
          getDefaultMessage()
        ],
        unreadCount: 0
      }
      return {
        pRizzTipAddresses,
        navVisible: false,
        customProvider: '',
        providerList: defaultProviderList,
        iota: {
          status: '',
          link: null,
          provider: initialProvider,
          connected: false,
          latestMilestone: '',
          latestSolidMilestone: '',
          latestMilestoneIndex: 0,
          latestSolidSubtangleMilestoneIndex: 0,
        },
        channelController: {
          channels: [
            globalChannel
          ],
          privateChannels: [], // private channels have an added `password` field
          currentChannel: globalChannel,
          currentPrivateChannel: null,
          encryptedPayloadCache: [],
          getActiveChannel() {
            return this.currentChannel || this.currentPrivateChannel
          },
          isCurrentChannelPrivate() {
            return this.getActiveChannel() === this.currentPrivateChannel
          },
          setCurrentChannel(channel) {
            channel.unreadCount = 0
            this.currentChannel = channel
            this.currentPrivateChannel = null
          },
          setCurrentPrivateChannel(channel) {
            channel.unreadCount = 0
            this.currentChannel = null
            this.currentPrivateChannel = channel
          },
          addNewChannel (channelName) {
            const alreadyExists = this.channels.find(channel => {
              return channel.name === channelName
            })
            if(alreadyExists) { return }
            const newChannel = {
              name: channelName,
              messages: [
                getDefaultMessage()
              ],
              unreadCount: 0
            }
            this.channels.push(newChannel)
            this.setCurrentChannel(newChannel)
          },
          addNewPrivateChannel(channelName, channelPassword) {
            const alreadyExists = this.privateChannels.find(channel => {
              return channel.name === channelName
            })
            if(alreadyExists) { return }
            const newChannel = {
              name: channelName,
              messages: [
                getDefaultMessage()
              ],
              unreadCount: 0,
              password: channelPassword
            }
            this.privateChannels.push(newChannel)
            this.setCurrentPrivateChannel(newChannel)
            this.encryptedPayloadCache.filter((encryptedPayload) => { return encryptedPayload.channelName === channelName }).forEach(this.putNewEncryptedMessagePayloadInChannel, this)
          },
          isActiveChannel(channelName, isPrivate) {
            if(isPrivate) {
              return channelName === (this.currentPrivateChannel && this.currentPrivateChannel.name)
            }
            return channelName === (this.currentChannel && this.currentChannel.name)
          },
          newUnreadMessageInChannel(channel) {
            if(!channel) { return }
            if(this.currentChannel === channel) { return }
            if(this.currentPrivateChannel === channel) { return }

            channel.unreadCount += 1
          },
          handleNewMessage(newMessagePayload) {
            if(!newMessagePayload) { return }
            if(newMessagePayload.encryptedPayload) {
              return this.putNewEncryptedMessagePayloadInChannel(newMessagePayload)
            }
            this.putNewMessagePayloadInChannel(newMessagePayload)
          },
          cacheEncryptedPayload(encryptedPayload) {
            this.encryptedPayloadCache.push(encryptedPayload)
          },
          async putNewEncryptedMessagePayloadInChannel(newMessagePayload) {
            if(!newMessagePayload.channelName) { return }
            let existingChannel = this.privateChannels.find(channel => {
              return channel.name === newMessagePayload.channelName
            })

            if(!existingChannel) {
              return this.cacheEncryptedPayload(newMessagePayload)
            }

            const channel = existingChannel

            if(!newMessagePayload.encryptedPayload) { return }

            let decryptedMessagePayload
            try {
              decryptedMessagePayload = await ChatangleCodec.decryptPayload(newMessagePayload.encryptedPayload, existingChannel.password)
            } catch(e) {
              console.log(`${new Date().toISOString()}: failed to decrypt payload in ${newMessagePayload.channelName}`)
              return
            }

            if(!decryptedMessagePayload) { return }

            if(!newMessagePayload.txHash) { return }
            const txHash = newMessagePayload.txHash
            const name = decryptedMessagePayload.name || 'Anonymous'
            const date = newMessagePayload.attachmentTimestamp && new Date(newMessagePayload.attachmentTimestamp) || new Date()

            const newMessage = {
              name: name,
              message: decryptedMessagePayload.message,
              imgurHash: decryptedMessagePayload.imgurHash,
              txHash: txHash,
              date: date,
              key: messageKeyCount++
            }

            channel.messages.unshift(newMessage)
            this.newUnreadMessageInChannel(channel)
          },
          putNewMessagePayloadInChannel(newMessagePayload) {
            console.log(`Got message`, newMessagePayload)

            if(!newMessagePayload.channelName) { return }
            let existingChannel = this.channels.find(channel => {
              return channel.name === newMessagePayload.channelName
            })

            let channel = null
            if(existingChannel) {
              channel = existingChannel
            } else {
              channel = {
                name: newMessagePayload.channelName,
                messages: [],
                unreadCount: 0,
              }
            }

            if(!newMessagePayload.message) { return }
            const messageText = newMessagePayload.message

            if(!newMessagePayload.txHash) { return }
            const txHash = newMessagePayload.txHash
            const name = newMessagePayload.name || 'Anonymous'
            const date = newMessagePayload.attachmentTimestamp && new Date(newMessagePayload.attachmentTimestamp) || new Date()

            const newMessage = {
              name: name,
              message: messageText,
              imgurHash: newMessagePayload.imgurHash,
              txHash: txHash,
              date: date,
              key: messageKeyCount++
            }

            channel.messages.unshift(newMessage)
            if(!existingChannel) {
              this.channels.push(channel)
            }
            this.newUnreadMessageInChannel(channel)
          },
          putCachedMessagesInChannels(cachedMessages) {
            console.log(`Got cached messages`, cachedMessages)
            cachedMessages.forEach(this.handleNewMessage, this)
          }
        },
        clientCount: 0,
        webSocketRetryTimer: 3000, // milliseconds
        isWebGL2Supported: true,
        isProviderModalActive: false,
        intendedHTTPSite: null
      }
    },
    computed: {
      providerHealth () {
        return this.iota.latestSolidSubtangleMilestoneIndex + ' / ' + this.iota.latestMilestoneIndex
      }
    },
    methods: {
      addProvider () {
        if(this.customProvider) {
          this.providerList.push(this.customProvider)
          this.customProvider = ''
        }
      },
      connectToIOTA () {
        if(window.location.protocol.includes('https:') && this.iota.provider.includes('http:')) {
          this.intendedHTTPSite = this.iota.provider
          this.isProviderModalActive = true
          // FIXME: this.iota.provider is stale
          // this.iota.provider = this.iota.link.provider ?
          return
        }

        this.iota.status = 'Connecting' // TODO: rename this.iota to this.iotaConnectionController
        this.iota.connected = false
        this.iota.latestMilestoneIndex = 0
        this.iota.latestSolidSubtangleMilestoneIndex = 0
        this.iota.version = null

        this.iota.link = new IOTA({
          provider: this.iota.provider
        })

        this.iota.link.api.attachToTangle = localAttachToTangle

        let currentLink = this.iota.link

        this.iota.link.api.getNodeInfo((err, success) => {
          if(currentLink !== this.iota.link) { return }
          if (err) {
            this.iota.status = 'Failed'
            return
          }
          this.iota.status = 'Connected'
          this.iota.connected = true
          this.iota.latestMilestone = success.latestMilestone
          this.iota.latestSolidMilestone = success.latestSolidSubtangleMilestone
          this.iota.latestMilestoneIndex = success.latestMilestoneIndex
          this.iota.latestSolidSubtangleMilestoneIndex = success.latestSolidSubtangleMilestoneIndex
          this.iota.version = success.appVersion
        })
      },
      openHTTPSite() {
        this.isProviderModalActive = false
        window.open(window.location.href.replace('https:', 'http:'), '_blank')
      },
      closeModal() {
        this.isProviderModalActive = false
      },
      connectToChatangleServer () {
        console.log(`${new Date().toISOString()}: Connecting to Chatangle server at ${chatangleBackendURL}`)
        let retried = false
        let webSocketClient = new WebSocket(chatangleBackendURL)
        webSocketClient.addEventListener('message', message => {
          const chatangleBackendMessage = JSON.parse(message.data)
          switch(chatangleBackendMessage['type']) {
            case 'clientCount':
              this.updateClientCount(chatangleBackendMessage['payload'])
              break
            case 'newMessage':
              this.channelController.handleNewMessage(chatangleBackendMessage['payload'])
              break
            case 'cachedMessages':
              this.channelController.putCachedMessagesInChannels(chatangleBackendMessage['payload'])
              break
            default: break
          }
        })
        webSocketClient.addEventListener('open', message => {
          console.log(`${new Date().toISOString()}: WebSocket open:`, message)
        })
        webSocketClient.addEventListener('error', message => {
          console.error(`${new Date().toISOString()}: WebSocket error:`, message)
          if(retried) { return }
          retried = true
          this.webSocketRetryTimer *= 1.21
          setTimeout(() => { this.connectToChatangleServer() }, this.webSocketRetryTimer)
        })
        webSocketClient.addEventListener('close', message => {
          console.log(`${new Date().toISOString()}: WebSocket close:`, message)
          if(retried) { return }
          retried = true
          this.webSocketRetryTimer *= 1.21
          setTimeout(() => { this.connectToChatangleServer() }, this.webSocketRetryTimer)
        })
      },
      updateClientCount (clientCountPayload) {
        if(!clientCountPayload || !clientCountPayload.clientCount) { return }
        this.clientCount = clientCountPayload.clientCount
      },
      imgurHashFromLink({ imgurLink }) {
        if(!imgurLink) { return null }

        let imgurURL

        try {
          imgurURL = new URL(imgurLink)
        } catch(e) {
          return null
        }

        if(!imgurURL.hostname.endsWith('imgur.com')) { return null }

        const pathname = imgurURL.pathname
        const paths = pathname.split('/')

        if(paths.length === 0) { return null }

        const imgurHash = paths[paths.length - 1]
        return imgurHash
      },
      async generateTransfer({ name, messageText, imgurLink }) {
        let payload = {
          name,
          message: messageText,
        }

        const imgurHash = this.imgurHashFromLink({ imgurLink })
        if(imgurHash) {
          payload['imgurHash'] = imgurHash
        }

        let transferMessage = {
          app: 'Chatangle',
          apiVersion: 1
        }

        if(this.channelController.isCurrentChannelPrivate()) {
          let encryptedPayload
          try {
            encryptedPayload = await ChatangleCodec.encryptPayload(payload, this.channelController.getActiveChannel().password)
          } catch (e) {
            console.log(`error occurred while encrypting: `, e)
          }
          transferMessage['encryptedPayload'] = encryptedPayload
        } else {
          transferMessage['payload'] = payload
        }

        return [{
          address: TryteCodec.trytesFromUTF8String(this.channelController.getActiveChannel().name).padEnd(81, '9'),
          value: 0,
          message: TryteCodec.tritifiedJSONFromObject(transferMessage),
          tag: 'CHATANGLE'
        }]
      },
      generateSeed () {
        return [...Array(81)].map(() => (function getRandomChar() { return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'[window.crypto.getRandomValues(new Uint8Array(1))] || getRandomChar() })()).join('')
      },
      // returns a depth in [4, 12] inclusive
      generateDepth() {
        return Math.floor(Math.random() * (12 - 4 + 1)) + 4
      },
      async sendMessageToTanglePromise({ name, messageText, imgurLink }) {
        const transfer = await this.generateTransfer({ name, messageText, imgurLink })

        return new Promise((resolve, reject) => {
          const startTime = performance.now()
          if(!this.iota || !this.iota.link) { return reject('no link') }
          if(this.iota.status !== 'Connected') { return reject('not connected') }

          this.iota.link.api.sendTransfer(this.generateSeed(), this.generateDepth(), 14, transfer, function(error, success) {
            if (error) {
              console.error(`${new Date().toISOString()}: an error occurred while sending to the tangle: `, error)
              return reject(error)
            }
            console.log(`${new Date().toISOString()}: successfully sent to the tangle: `, success)
            resolve(performance.now() - startTime)
          })
        })
      }
    },
    mounted () {
      if(!curlImpl.error) {
        localAttachToTangle = curlTransaction({ curlImpl }).localAttachToTangle
        console.log('Your browser does support WebGL2')
      } else {
        console.error('Your browser does not support WebGL2')
        this.isWebGL2Supported = false
      }

      this.connectToIOTA()
      this.connectToChatangleServer()
    }
  }
</script>

