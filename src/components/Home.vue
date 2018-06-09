<template>
  <div>

    <div class="hero is-light" :class="$route.name === 'Home' ? 'is-small': 'is-small'">
      <div class="hero-body">

        <div class="container has-text-centered">

          <div class="tile is-ancestor">

            <div class="tile is-2 is-parent">
              <div class="tile is-child">
                <channel-list :channel-controller="channelController"></channel-list>
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
  import MessageInput from "./MessageInput.vue"
  import ChannelChatroom from "./ChannelChatroom.vue"
  import ChannelList from "./ChannelList.vue"
  import PrivateChannelList from "./PrivateChannelList"

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
