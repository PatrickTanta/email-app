<template>
  <h1>
    {{ emailSelection.emails.size }}
  </h1>
  <transition name="switch" mode="out-in">
    <table v-if="unarchivedEmails.length" class="mail-table">
      <transition-group tag="tbody" name="list" appear data-cy="emails">
        <tr
          v-for="email in unarchivedEmails"
          :key="email.id"
          class="list-item"
          :class="['clickable', email.read ? 'read': '']"
          @click="openEmail(email)"
        >
          <td>
            <input
              type="checkbox"
              :selected="emailSelection.emails.has(email)"
              @click.stop="emailSelection.toggle(email)"
            />
          </td>
          <td>{{ email.from }}</td>
          <td>
            <p>
              <strong> {{ email.subject }} </strong> - {{ email }}
            </p>
          </td>
          <td class="date">
            {{ dayjs(new Date(email.sentAt)).format('MMMM D, YYYY h:mm A') }}
          </td>
           <td>
            <button @click.stop="archivedEmail(email)">
              Archive
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-else>
      There's no more email to read
    </div>
  </transition>
  <ModalView v-if="openedEmail!==null" @closeModal="openedEmail=null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<script>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'
import useEmailSelection from '@/composables/use-email-selection'

export default {
  name: 'MailTable',
  components: { MailView, ModalView },
  async setup () {
    const { data: em } = await axios.get('http://localhost:3000/emails')
    const emails = ref(em)
    const sortedEmails = computed(() => {
      const emailsValues = emails.value
      return emailsValues.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    })

    // opened email
    const openedEmail = ref(null)
    const openEmail = (email) => {
      openedEmail.value = email
      if (email) {
        email.read = true
        updateEmail(email)
      }
    }

    const archivedEmail = (email) => {
      email.archived = true
      updateEmail(email)
    }
    const unarchivedEmails = computed(() => {
      return sortedEmails.value.filter(e => !e.archived)
    })
    const updateEmail = (email) => {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
    const changeEmail = ({ toggleRead, toggleArchive, save, closeModal, changeIndex }) => {
      const email = openedEmail.value
      if (toggleRead) { email.read = !email.read }
      if (toggleArchive) { email.archived = !email.archived }
      if (save) { updateEmail(email) }
      if (closeModal) { openedEmail.value = null }
      if (changeIndex) {
        const emails = unarchivedEmails.value
        const currentIndex = emails.indexOf(openedEmail.value)
        const newEmail = emails[currentIndex + changeIndex] || null
        openEmail(newEmail)
      }
    }

    return {
      dayjs,
      emails,
      sortedEmails,
      openedEmail,
      unarchivedEmails,
      updateEmail,
      openEmail,
      archivedEmail,
      changeEmail,
      emailSelection: useEmailSelection()
    }
  }
}
</script>

<style scoped>
.list-item {
  /* display: flex; */
  height: 40px;
  /* margin-right: 10px; */
}
/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.3s ease;
}
/* switch transitions */
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-active{
  transition: all 0.5s ease;
}
.switch-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}
</style>
