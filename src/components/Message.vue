<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <b-icon icon="person" size="is-medium"></b-icon>
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
    computed: {
      transactionHashTangleExplorerLink () {
        return `https://open-iota.prizziota.com/#/search/tx/${this.messageData.txHash}`
      }
    }
  }
</script>
