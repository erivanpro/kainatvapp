import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PenTwoComponent = (props: SvgProps) => (
  <Svg
   
    width={15.999}
    height={15.999}
    {...props}
  >
    <Path
      fill="#fff"
      d="m15.558 4.439-1.44 1.44a.375.375 0 0 1-.531 0L10.118 2.41a.375.375 0 0 1 0-.531l1.44-1.44a1.5 1.5 0 0 1 2.122 0l1.878 1.878a1.5 1.5 0 0 1 0 2.122ZM8.88 3.117.674 11.323l-.662 3.8a.751.751 0 0 0 .869.869l3.8-.666 8.206-8.206a.375.375 0 0 0 0-.531L9.415 3.117a.379.379 0 0 0-.534 0Zm-5 7.5a.436.436 0 0 1 0-.619l4.81-4.809a.438.438 0 0 1 .619.619L4.498 10.62a.436.436 0 0 1-.619 0Zm-1.131 2.631h1.5v1.134l-2.016.353-.972-.972.353-2.016h1.135Z"
      data-name="Icon awesome-pencil-alt"
    />
  </Svg>
)
export default PenTwoComponent
