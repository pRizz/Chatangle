<template>
  <div class="box">
    <div class="title">
      {{ channel.name }} Channel
    </div>
    <transition-group name="list">
      <div v-for="messageData in channel.messages" v-bind:key="messageData.key" tag="p">
        <message :message-data="messageData"></message>
        <br>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import Message from './Message.vue'

  export default {
    components: {Message},
    name: 'channel-chatroom',
    props: ['channel']
  }
</script>

<style>
  .list-enter-active, .list-leave-active {
    transition: all 0.6s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
