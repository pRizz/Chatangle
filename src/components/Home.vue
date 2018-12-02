<template>
  <div>

    <div class="hero is-light" :class="$route.name === 'Home' ? 'is-small': 'is-small'">
      <div class="hero-body">

        <div class="container has-text-centered">

          <div class="tile is-ancestor">

            <div class="tile is-2 is-parent">
              <div class="tile is-child">
                <channel-list :channel-controller="channelController"></channel-list>
                <br/>
                <div class="panel">
                  <p class="panel-heading">
                    Liking Chatangle?
                  </p>

                  <div class="panel-block">
                    <!-- Check out Chatangle! A free, decentralized, global chatroom, powered by the IOTA tangle! #Chatangle @pryszkie https://www.chatangle.com/ -->
                      <a class="button is-primary-purple" style="background-color: #1da1f2;" href="http://twitter.com/home?status=Check%20out%20Chatangle!%20A%20free%2C%20decentralized%2C%20global%20chatroom%2C%20powered%20by%20the%20IOTA%20tangle!%20%23Chatangle%20%40pryszkie%20https%3A%2F%2Fwww.chatangle.com%2F
" target="_blank">
                        <i class="fab fa-twitter"></i>&nbsp;Spread the word!
                      </a>
                  </div>
                  <div class="panel-block">
                      <a class="button is-primary" href="https://www.npmjs.com/package/chatangle-full-stack" target="_blank">
                        <i class="fa fa-wifi"></i>&nbsp;Deploy your own!
                      </a>
                  </div>
                </div>

                </div>
            </div>

            <div class="tile is-parent is-8 is-vertical">
              <article class="tile is-child content" style="flex-grow: 0;">
                  <message-input :message-sender-delegate="messageSenderDelegate" :isWebGL2Supported="isWebGL2Supported"></message-input>
              </article>
              <article class="tile is-child content">
                  <channel-chatroom :channel="channelController.getActiveChannel()"></channel-chatroom>
              </article>
            </div>

            <div class="tile is-2 is-parent">
              <div class="tile is-child">
                <private-channel-list :channel-controller="channelController"></private-channel-list>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <router-view :iota="iota"></router-view>

  </div>
</template>

<script>
  import MessageInput from './MessageInput.vue'
  import ChannelChatroom from './ChannelChatroom.vue'
  import ChannelList from './ChannelList.vue'
  import PrivateChannelList from './PrivateChannelList'

  export default {
    components: {
      PrivateChannelList,
      ChannelList,
      ChannelChatroom,
      MessageInput},
    name: 'home',
    props: ['iota', 'channelController', 'messageSenderDelegate', 'isWebGL2Supported'],
  }
</script>

<style scoped>
</style>
