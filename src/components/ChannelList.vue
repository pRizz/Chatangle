<template>
  <div>

    <div class="panel">
      <p class="panel-heading">
        Public Channels
      </p>

      <div class="panel-block">
        <p class="control">
          New Channels will appear here as people create messages on them
        </p>
      </div>

      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Filter (Not yet implemented)">
          <span class="icon is-small is-left">
            <b-icon icon="magnify"></b-icon>
          </span>
        </p>
      </div>

      <a v-for="channel in channelController.channels" v-on:click="setCurrentChannel(channel)" class="hover-channel panel-block" v-bind:class="{'active-channel': isActiveChannel(channel.name), 'has-text-weight-bold': shouldChannelBeBold(channel)}">
        <b-tag rounded type="is-primary-purple" style="margin-right: 8px" v-if="hasUnread(channel)" >{{unreadDisplayText(channel)}}</b-tag>
        <span class="hover-channel hover-child panel-icon" v-bind:class="{'active-channel': isActiveChannel(channel.name)}">
          <span class="hover-channel hover-child icon is-small is-left" v-bind:class="{'active-channel': isActiveChannel(channel.name)}">
            <i class="fas fa-wifi"></i>
          </span>
        </span>
        {{ truncateChannelName(channel.name)}}
      </a>

      <div class="field">
        <label class="label"></label>
        <div class="control">
          <input class="input" type="text" v-model="newChannelName" @keyup.enter="addChannel" placeholder="New channel (max 40 chars)" maxlength="40">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'channel-list',
    props: ['channelController'],
    data () {
      return {
        newChannelName: ''
      }
    },
    methods: {
      setCurrentChannel (channel) {
        console.log('setting channel to ' + channel.name)
        this.channelController.setCurrentChannel(channel)
      },
      addChannel () {
        const newChannelName = this.newChannelName && this.newChannelName.trim()
        if(!newChannelName) { return }
        this.channelController.addNewChannel(newChannelName)
        this.newChannelName = ''
      },
      isActiveChannel (name) {
        return this.channelController.isActiveChannel(name)
      },
      truncateChannelName(name) {
        if(!name || !name.length) {
          return console.error(`Error, no name supplied to truncateChannelName`)
        }

        const truncationLength = 15
        if(name.length < truncationLength) {
          return name
        }
        return `${name.substring(0, truncationLength)}...`
      },
      hasUnread(channel) {
        return channel.unreadCount > 0
      },
      unreadDisplayText(channel) {
        console.log(`getting displayUnread for ${channel.name}, ${channel.unreadCount}`)
        if(channel.unreadCount > 0) {
          return `${channel.unreadCount} `
        } else {
          return ''
        }
      },
      shouldChannelBeBold(channel) {
        return channel.unreadCount > 0
      }

    },
  }
</script>

<style>
  .active-channel {
    background-color: #7957d5 !important;
    color: #fff !important;
  }
  .hover-channel:hover, .hover-channel:hover .hover-child {
    background-color: #8967e5 !important;
    color: #fff !important;
  }
</style>
