/* eslint-disable import/prefer-default-export */
import { act } from 'react-dom/test-utils'

export const getWrapper = (wrapper, selector) => wrapper.find(selector)

export const updateFormikField = async (
  nativeFieldWrapper,
  targetName,
  value,
  onlyBlurEvent = false,
) => {
  if (!onlyBlurEvent) {
    // updates values and errors
    await act(async () => {
      nativeFieldWrapper.simulate(
        'change',
        { target: { name: targetName, value } },
      )
    })
  }

  // updates touched
  await act(async () => {
    nativeFieldWrapper.simulate(
      'blur',
      { target: { name: targetName } },
    )
  })
}
