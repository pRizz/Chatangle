<template>
  <div>

    <div class="panel">
      <p class="panel-heading">
        Private Channels
      </p>

      <div class="panel-block">
        <p class="control">
          Create a new private channel below. Private channels are password protected with symmetric <a target="_blank" href="https://en.wikipedia.org/wiki/Pretty_Good_Privacy">PGP encryption</a>.
        </p>
      </div>

      <a v-for="channel in channelController.privateChannels" v-on:click="setCurrentChannel(channel)" class="hover-channel panel-block" v-bind:class="{'active-channel': isActiveChannel(channel.name), 'has-text-weight-bold': shouldChannelBeBold(channel)}">
        <b-tag rounded type="is-primary-purple" style="margin-right: 8px" v-if="hasUnread(channel)" >{{unreadDisplayText(channel)}}</b-tag>
        <span class="hover-channel hover-child panel-icon" v-bind:class="{'active-channel': isActiveChannel(channel.name)}">
          <b-icon icon="wifi" size="is-small" class="hover-channel hover-child" v-bind:class="{'active-channel': isActiveChannel(channel.name)}">
          </b-icon>
        </span>
        {{ truncateChannelName(channel.name)}}
      </a>

      <div class="field">
        <label class="label"></label>
        <div class="control">
          <input class="input" type="text" v-model="newChannelName" @keyup.enter="newChannelNameEntered" placeholder="New channel (max 40 chars)"  maxlength="40">
        </div>
      </div>

    </div>

    <b-modal :active.sync="isNewChannelModalActive">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Private Channel</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div>
            You are joining or making a new private channel named "{{ newChannelName }}" over the IOTA network, encrypted with <a target="_blank" href="https://en.wikipedia.org/wiki/Pretty_Good_Privacy">PGP encryption</a>. Please enter a password for your channel. Password must be at least 8 characters.
          </div>
          <br/>
          <div>
            <div class="field">
              <label class="label"></label>
              <div class="control">
                <input ref="modalInput" class="input" type="password" v-model="newChannelPassword" @keyup.enter="isNewPrivateChannelValid() && createPrivateChannelButtonPressed()" placeholder="New channel password (minimum of 8 characters)">
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" :disabled="!isNewPrivateChannelValid()" @click="createPrivateChannelButtonPressed">Create Private Channel</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'private-channel-list',
    props: ['channelController'],
    data () {
      return {
        newChannelName: '',
        isNewChannelModalActive: false,
        newChannelPassword: ''
      }
    },
    methods: {
      newChannelNameEntered() {
        const newChannelName = this.newChannelName && this.newChannelName.trim()
        if(!newChannelName) { return }

        const alreadyExists = this.channelController.privateChannels.find(channel => {
          return channel.name === newChannelName
        })
        console.log('does channel already exist? ' + alreadyExists)
        if(alreadyExists) { return }

        this.newChannelPassword = ''
        this.isNewChannelModalActive = true
        this.$nextTick(() => { this.$refs.modalInput.focus() })
      },
      isNewPrivateChannelValid() {
        return this.newChannelPassword.length >= 8
      },
      closeModal() {
        this.isNewChannelModalActive = false
        this.newChannelPassword = ''
      },
      createPrivateChannelButtonPressed() {
        this.addChannel()
        this.closeModal()
      },
      setCurrentChannel (channel) {
        console.log('setting channel to ' + channel.name)
        this.channelController.setCurrentPrivateChannel(channel)
      },
      addChannel() {
        this.channelController.addNewPrivateChannel(this.newChannelName, this.newChannelPassword)
        this.newChannelName = ''
        this.newChannelPassword = ''
      },
      isActiveChannel (name) {
        return this.channelController.isActiveChannel(name, true)
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
