import {mount} from '@vue/test-utils';
import App from '@/App'
import store from '@/store/index';


test('does not render an errror', () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    expect(wrapper.find('.error').exists()).toBe(false)
})


test('should render an error message', async () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    await wrapper.find('.bill').setValue('');
    await wrapper.find('.people').setValue('');
    await wrapper.find('.tip').trigger('click');
    await wrapper.find('.calculate').trigger('click')

    expect(wrapper.find('.error').exists()).toBe(true)
})


test('should work', async () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    await wrapper.find('.bill').setValue(100);
    await wrapper.find('.people').setValue(2);
    await wrapper.find('.tip').trigger('click');
    await wrapper.find('.calculate').trigger('click');

    expect(store.state.tip_amount).toBe(2.5);
    expect(wrapper.find('.money').text()).toContain('2.5');
})

test('should add class', async () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    await wrapper.find('.tip').trigger('click');

    expect(wrapper.find('.tip').classes()).toContain('active');
})

test('should reset', async () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    await wrapper.find('.bill').setValue(100);
    await wrapper.find('.people').setValue(2);
    await wrapper.find('.reset').trigger('click');

    expect(wrapper.find('.bill').text()).toEqual('');
    expect(wrapper.find('.people').text()).toEqual('');
})
