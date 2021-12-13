import MailView from '@/components/MailView'
import { mount } from '@vue/test-utils'

describe('MailView', () => {
  test('should show the email', () => {
    const wrapper = mount(MailView, {
      props: {
        email: {
          id: 1,
          from: "team@vuemastery.com",
          subject: "What's up with Vue 3.0? Here's how to find out from Evan You",
          body: "The opening keynote of VueConf US this year was Evan You (the creator of Vue), giving his State of the Vuenion address. He walked us through the journey of getting Vue 3 from a prototype to a reality the past year. He also dove into Vue's overall growth in the community.",
          sentAt: "2020-03-27T18:25:43.511Z",
          archived: true,
          read: true
        }
      }
    })
    expect(wrapper.find('em').text()).toContain("team@vuemastery.com")
    expect(wrapper.find('strong').text()).toBe("What's up with Vue 3.0? Here's how to find out from Evan You")
    expect(wrapper.find(".body").text()).toContain("The opening keynote of VueConf US this year was Evan You (the creator of Vue), giving his State of the Vuenion address. He walked us through the journey of getting Vue 3 from a prototype to a reality the past year. He also dove into Vue's overall growth in the community.")
  });

  test
});