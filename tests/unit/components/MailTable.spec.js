import { mount } from '@vue/test-utils'
import MailTable from '@/components/MailTable'

// function factory (component) {
//   return mount(component)
// }

describe('MailTable', () => {
  test('Open modal when click in row', async () => {
    const wrapper = await mount(MailTable)
    console.log(wrapper.vm)
  })
});