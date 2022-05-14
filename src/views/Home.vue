<template>
  <div class="home">
    <h1>VMail Inbox</h1>
    <Suspense>
      <template #default>
        <MailTable />
      </template>
      <template #fallback>
        <div>
          <Loader />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import MailTable from '@/components/MailTable'
import Loader from '@/components/Loader'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    MailTable,
    Loader
  }
}
</script>
