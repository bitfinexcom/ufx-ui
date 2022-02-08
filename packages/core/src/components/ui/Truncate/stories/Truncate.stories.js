import {
  getDefaultMetadata,
  showTemplateStory,
} from '../../../../../../storybook/.storybook/helper'
import Truncate from '../Truncate'

export default getDefaultMetadata(Truncate, 'Components/ui/Truncate', {}, true)

export const basic = showTemplateStory(Truncate, {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut porttitor sapien. Nam eget lacus at risus suscipit dignissim. Nullam in eros nec nisl fermentum dignissim. Fusce tincidunt, nisi sed interdum suscipit, felis orci aliquet urna, nec fermentum leo justo sit amet tortor. Duis ornare ligula ex, at fermentum purus iaculis eleifend. Nunc molestie nunc in sapien ornare fermentum. Praesent lacinia lacus et urna laoreet, nec lacinia dui aliquet. Ut ut sodales leo. Praesent lectus tellus, auctor sit amet ipsum in, convallis cursus ipsum. Duis dictum nulla a lorem tincidunt, blandit interdum lorem ullamcorper. Fusce vestibulum risus arcu, nec malesuada elit convallis ac. Nulla ultrices non mi a semper. Ut varius eleifend purus, et fermentum orci consectetur quis. Vestibulum at ante semper libero egestas imperdiet. Maecenas sit amet mi libero. Vestibulum venenatis fermentum eros, ut auctor felis fermentum at.',
})
