<template>
  <article class="media box">
    <div class="media-content">

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" maxlength="50" v-model="name" :disabled="isSendingMessage" placeholder="Your name (optional; 50 characters max)">
            <b-icon icon="account"></b-icon>
        </p>
      </div>

      <div class="field">
        <p class="control">
          <textarea class="textarea" rows="2" maxlength="250" v-model="messageText" :disabled="isSendingMessage" placeholder="Your message (250 characters max)"></textarea>
          <span
            style="bottom: 8px; right: 12px; position: absolute"
            @click="pickerHidden = !pickerHidden"
          >
            <emoji emoji="smiley"></emoji>
          </span>
          <picker
            style="position: absolute; right: 0px; z-index: 100;"
            set="apple"
            @select="addEmoji"
            v-bind:class="{ 'is-hidden': pickerHidden }"
          ></picker>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" maxlength="100" v-model="imgurLink" :disabled="isSendingMessage" placeholder="An imgur link (optional)">
          <span class="icon">
            <b-icon icon="image"></b-icon>
          </span>
        </p>
      </div>

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <b-tooltip label="Your browser or device does not support WebGL2, which is required to send messages to the tangle. Try using Google Chrome." multilined :active="!isWebGL2Supported">
              <a class="button is-info" :disabled="isSendingMessage || !isWebGL2Supported" :class="{'is-loading': isSendingMessage}"
                 v-on:click="sendMessage()">{{sendButtonText}}</a>
            </b-tooltip>
          </div>
          <div class="level-item has-text-grey">
            {{ buttonTipText }}
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
          </div>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
  import { Picker, Emoji } from 'emoji-mart-vue'
  import BTooltip from 'buefy/src/components/tooltip/Tooltip.vue'
  import BIcon from "buefy/src/components/icon/Icon";

  const readyStates = {
    notSending: 'notSending',
    sending: 'sending',
    sendingFailed: 'sendingFailed'
  }

  export default {
    name: 'message-input',
    props: ['messageSenderDelegate', 'isWebGL2Supported'],
    components: {
      BIcon,
      BTooltip,
      picker: Picker,
      emoji: Emoji
    },
    data () {
      return {
        name: '',
        messageText: '',
        imgurLink: '',
        readyStates: readyStates,
        readyState: readyStates.notSending,
        mostRecentSendDuration: null,
        pickerHidden: true
      }
    },
    methods: {
      sendMessage () {
        this.pickerHidden = true
        if(!this.isWebGL2Supported) { return }

        this.readyState = this.readyStates.sending
        this.messageSenderDelegate.sendMessageToTanglePromise({
          name: this.name,
          messageText: this.messageText,
          imgurLink: this.imgurLink
        }).then((sendDurationMS) => {
          this.readyState = this.readyStates.notSending
          console.log('promise succeeded')
          this.messageText = ''
          this.imgurLink = ''
          this.mostRecentSendDuration = sendDurationMS
        }).catch((error) => {
          this.readyState = this.readyStates.sendingFailed
          console.log('promise failed: ', error)
        })
      },
      addEmoji(emoji) {
        this.messageText += emoji.native // FIXME: mistake if cursor is not at the end of the text
      }
    },
    computed: {
      isSendingMessage() {
        return this.readyState === this.readyStates.sending
      },
      sendButtonText() {
        if(this.readyState === this.readyStates.sendingFailed) {
          return 'Sending Failed - Change Server and Try Again'
        }
        return 'Talk to the Tangle!'
      },
      buttonTipText() {
        if(this.readyState === this.readyStates.sending) {
          return 'Performing Proof of Work (PoW) and Attaching Message to the Tangle'
        }
        if(this.mostRecentSendDuration) {
          return `Took ${Number((this.mostRecentSendDuration / 1000).toFixed(3))} seconds`
        }
        return ''
      }
    }
  }
</script>
