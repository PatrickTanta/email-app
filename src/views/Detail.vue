<template>
  <Suspense>
    <template #default>
      <div style="border: 2px solid red; background: black;">
        <h1>
          {{ email }}
        </h1>
        <h2 class="mb-0">
          Subject: <strong>{{ email.subject }}</strong>
        </h2>
        <div>
          <em>
            From {{ email.fromm }} on {{ dayjs(new Date(email.sentAt)).format('MMMM D, YYYY h:mm A') }}
          </em>
        </div>
        <div class="body" v-html="marked(email.body)" />
      </div>
    </template>
    <template #fallback>
      <div>
        <Loader />
      </div>
    </template>
  </Suspense>
</template>

<script>
import axios from 'axios'
import { marked } from 'marked'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '../components/Loader.vue'

export default {
  name: 'Detail',
  components: { Loader },
  async setup () {
    const route = useRoute()
    const { data: em } = await axios.get(`http://127.0.0.1:8000/emails/${route.params.id}/`)
    const email = ref(em)
    console.log(email)
    console.log(email.value)
    return {
      email,
      marked,
      dayjs
    }
  }
}
</script>
