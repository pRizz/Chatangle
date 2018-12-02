<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <b-icon icon="account"></b-icon>
        </span>
      </div>

      <div class="media-content">
        <div class="content">
          <div>
            <strong>{{ messageData.name }}</strong> <small> {{ (new Date(messageData.date)).toString() }}</small>
            <br>
            <div>
              {{ messageData.message }}
            </div>
          </div>
          <div v-if="messageData.imgurHash">
            <blockquote class="imgur-embed-pub" lang="en" :data-id="'a/' + messageData.imgurHash">
              <a :href="'https://imgur.com/gallery/' + messageData.imgurHash">Imgur link</a>
            </blockquote>
          </div>
        </div>

        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" :href="transactionHashTangleExplorerLink" target="_blank">
              <span class="help">Transaction hash: <code>{{ messageData.txHash.substr(0, 10) }}...</code></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'message',
    props: ['messageData'],
    data() {
      return {
        window
      }
    },
    computed: {
      transactionHashTangleExplorerLink () {
        return `https://open-iota.prizziota.com/#/search/tx/${this.messageData.txHash}`
      }
    },
    methods: {
      renderImgurFrame() {
        if(!this.messageData.imgurHash) { return }
        setTimeout(() => {
          if(!this.window.imgurEmbed) {
            setTimeout(() => {
              this.renderImgurFrame()
            }, 2000)
            return
          }
          this.window.imgurEmbed && typeof this.window.imgurEmbed.createIframe === 'function' && this.window.imgurEmbed.createIframe() // FIXME: undocumented API
        }, 10)
      }
    },
    mounted() {
      this.renderImgurFrame()
    }
  }
</script>
