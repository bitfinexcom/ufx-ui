import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

const waitForNextTick = () => new Promise((resolve) => setTimeout(resolve))

// ignore all stories whose snapshots are not static
// Dialog stories use Portal which do not work well and shows updates in snapshots intermittently
const DialogStories = 'Dialog.stories.storyshot' // uses portal
const ContainerStories = 'containers' // uses live api data
const ignoreStoryIds = ['components-format-prettydate--show-year'] // uses current date

initStoryshots({
  test: async ({ story, context }) => {
    const { id } = story
    if (ignoreStoryIds.includes(id) || id.startsWith(ContainerStories)) {
      return
    }

    const converter = new Stories2SnapsConverter()
    const snapshotFileName = converter.getSnapshotFileName(context)

    if (snapshotFileName
      && !snapshotFileName.includes(DialogStories)
    ) {
      const storyElement = story.render(context)
      const tree = mount(storyElement)

      await act(async () => {
        await waitForNextTick()
      })

      expect(toJson(tree.update())).toMatchSnapshot()
    }
  },
})
