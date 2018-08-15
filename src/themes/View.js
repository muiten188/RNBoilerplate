import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { getTheme } from './utils'

class ThemeView extends Component {
    render() {
        const { forwardedRef, children, style, theme, ...rest } = this.props
        console.log('View Props', this.props)
        const themeStyle = getTheme(theme)
        console.log('Theme Style', themeStyle)
        return (
            <View ref={forwardedRef} {...rest}
                style={[style, { backgroundColor: themeStyle.backgroundColor }]}
            >
                {children}
            </View>
        )
    }
}

const ConnectedView = connect(state => ({
    theme: themeSelector(state)
}))(ThemeView)

export default React.forwardRef((props, ref) => {
    return <ConnectedView {...props} forwardedRef={ref} />
})