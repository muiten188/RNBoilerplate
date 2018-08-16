
import React, { Component } from 'react';
import {
    TagsInput, Button, Card, Colors,
    Carousel, Constants, PageControl
} from 'react-native-ui-lib';
import { Surface, Background, View, Text, TextInput, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ScrollView, ActivityIndicator, Platform } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import BottomSheet from '~/src/components/BottomSheet'
import TagSelect from '~/src/components/TagSelect'

class Home extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            page: 0
        }
    }

    navigationButtonPressed({ buttonId }) {
        console.log('Back Button Press', buttonId)
    }

    onChangePage = (index) => {
        console.log('Page Control', this.pageControl)
        this.setState({ page: index });
    }

    _handlePressButton = () => {
        console.log('Call Push Animated Screen', new Date().getTime())
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.AnimatedScreen',
            }
        })
    }

    _handleOpenFeed = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.FeedScreen',
            }
        });
    }

    componentDidMount() {
        this.props.getData()
    }

    _handleOpenBottomSheet = () => {
        this.bottomSheet && this.bottomSheet.open()
    }

    _renderFilter = () => {
        return (
            <BottomSheet
                ref={ref => this.bottomSheet = ref}
                showHeader={true}
                title={'Chọn bộ lọc'}
            >
                <Surface themeable={false}>

                    <TagSelect
                        data={
                            [
                                {
                                    id: 1,
                                    icon: 'account',
                                    text: 'Nam'
                                },
                                {
                                    id: 2,
                                    icon: 'account',
                                    text: 'Nữ'
                                },
                            ]
                        }
                        headerTitle={'Dành cho'}
                    />
                    <TagSelect
                        data={
                            [
                                {
                                    id: 1,
                                    icon: 'bike',
                                    text: 'Đạp xe'
                                },
                                {
                                    id: 2,
                                    icon: 'blinds',
                                    text: 'Trình chiếu'
                                },
                                {
                                    id: 3,
                                    icon: 'brain',
                                    text: 'Có não'
                                },
                                {
                                    id: 4,
                                    icon: 'saxophone',
                                    text: 'Saxophone'
                                },
                                {
                                    id: 5,
                                    icon: 'bus-side',
                                    text: 'Xe bus'
                                },
                                {
                                    id: 6,
                                    icon: 'stack-overflow',
                                    text: 'Stack Overflow'
                                },
                                {
                                    id: 7,
                                    icon: 'yin-yang',
                                    text: 'Dịch cân kinh ahihi text nữa'
                                },
                                {
                                    id: 8,
                                    icon: 'wallet',
                                    text: 'Ví tiền'
                                },
                                {
                                    id: 9,
                                    icon: 'shopping',
                                    text: 'Mua sắm'
                                },
                                {
                                    id: 10,
                                    icon: 'gamepad-variant',
                                    text: 'Giải trí'
                                },
                            ]
                        }
                        headerTitle={'Danh mục'}
                    />
                </Surface>
            </BottomSheet>
        )
    }

    _onChangeBottomTab = () => {
        // Navigation.mergeOptions('bottomTabs', {
        //     bottomTabs: {
        //         currentTabIndex: 1,
        //     }
        // })

        Navigation.mergeOptions('tab1', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab4', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab2', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab3', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })

        // Navigation.mergeOptions('bottomTabs', {
        //     bottomTabs: {
        //         backgroundColor: 'black',
        //     }
        // })
    }

    _handleLoadGoogle = () => {
        this.props.getTestData((err, data) => {
            console.log('Google Err', err)
            console.log('Google Data', data)
        })
    }

    render() {
        return (
            <Background style={{ flex: 1 }}>
                {this._renderFilter()}
                <ScrollView>
                    <Surface>
                        <Carousel loop onChangePage={(index => this.onChangePage(index))}>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 1</Text>
                            </Surface>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 2</Text>
                            </Surface>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 3</Text>
                            </Surface>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 4</Text>
                            </Surface>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 5</Text>
                            </Surface>
                            <Surface width={Constants.screenWidth} height={200}>
                                <Text>PAGE 6</Text>
                            </Surface>
                        </Carousel>
                        <PageControl width={Constants.width} containerStyle={styles.pageControl} numOfPages={6} currentPage={this.state.page} color={Colors.orange30} size={10}
                            ref={ref => this.pageControl = ref}
                        />
                    </Surface>
                    <Surface style={{ flexDirection: 'row', ...styles.block}}>
                        <Icon name="the-bank" style={{ fontSize: 30, marginRight: 10 }} />
                        <Icon name="clingme-building" style={{ fontSize: 30, marginRight: 10 }} />
                        <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 50} color={'#F16654'} />
                    </Surface>
                    <TextInput
                        placeholder={'Input something here...'}
                    />
                    <Surface style={styles.block}>
                        <Surface style={styles.block}>
                            <Button text70 white background-orange30 label="Open Screen" onPress={this._handlePressButton} />
                            <Button
                                outline
                                outlineColor={Colors.orange30}
                                label="Open Feed"
                                marginT-20
                                text70
                                onPress={this._handleOpenFeed}
                            />
                            <Button text70 white background-orange30 marginT-20 label="Open BottomSheet" onPress={this._handleOpenBottomSheet} />
                            <Button text70 white background-orange30 marginT-20 label="Change Tab" onPress={this._onChangeBottomTab} />
                            <Button text70 white background-orange30 marginT-20 label="Load Google" onPress={this._handleLoadGoogle} />
                        </Surface>
                        <Text h6>Text H6</Text>
                        <Text h5>Text H5</Text>
                        <Text body1>Text body1</Text>
                        <Text body2>Text body2</Text>
                        <Text overline>Text Overline</Text>
                    </Surface>

                </ScrollView>
            </Background>
        );
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(Home)
