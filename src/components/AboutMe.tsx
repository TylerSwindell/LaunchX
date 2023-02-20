import { ReactElement } from 'react'
import { StyleSheet, Text, View, Image, TextProps} from 'react-native'
import { margin, padding } from '../styles/styling'
import { ImageSize } from '../../types'
import { ImageSourcePropType } from 'react-native'

interface CircleImageProps {
  src: ImageSourcePropType,
  size: ImageSize
};
const CircleImage = (props: CircleImageProps):ReactElement => {
  const {src, size} = props
  
  const styles = {
    main: {...size, borderRadius: 100},
    shadow: {
		shadowOffset: {width: 0, height: 5}, 
		shadowColor: 'black',
		shadowOpacity: .6, 
		shadowRadius: 10, 
    },
    border: {
		borderWidth: 2,
		borderColor: '#eee'
    }
  }
  
  return (
    <View style={{...styles.main, ...styles.shadow}}>
      <Image source={src} style={{...styles.main, ...styles.border}}/>
    </View>
  )

}

const Title = (props: {text: string}) => {
  const styles = {
    title: {
      fontSize: 35,
      fontWeight: 'bold',
    } as TextProps
  }
  return (
    <Text style={styles.title}>{props.text}</Text>
  )
}

const Content = () => {
  return (
    <View>
		<Text>
			Hello! I am a design professional, with over a decade in the design/print industry, who has transitioned into full-stack web development. Additional skills in art direction, typography and adept at contributing to highly collaborative work environments, finding solutions and determining customer satisfaction. Compiler of knowledge with an insatiable curiosity and a passion for discovery. An organizational systems enthusiast seeking challenges and opportunities to broaden skills and enhance efficiency.
		</Text>
    </View>
  )
}

interface SpacerProps {
	space: number	
};

const Spacer = (props: SpacerProps) => {
	const { space } = props
	return (
		<View style={{height: 1, backgroundColor: '#555', width: '100%', ...margin({top: space, bottom:space})}}></View>
	)
}


export default function AboutMe() {
  const aboutMeImage = require("../../assets/images/me_500x500.png")

  return (
    <View style={styles.container}>
      <Title text="Tyler Swindell"/>
	  <Spacer space={30} />
      <CircleImage src={aboutMeImage} size={{width: 200, height: 200}}/>
	  <Spacer space={30} />
	  <Content />
    </View>
  )
}

const styles = StyleSheet.create({
  empty :{},
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: '100%',
    width: '100%', 
    ...padding(30)
  },

})