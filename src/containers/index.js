import { Navigation } from 'react-native-navigation'
import { getHOCScreen } from '~/src/utils'
import React, { Component } from 'react';
import { Provider } from 'react-redux';

export function registerContainerWithRedux(
    containerName,
    requireComponentFunction,
    store,
    needPreloadComponent = false
) {
    const generatorWrapper = function () {        
        
        const preloadComponent = needPreloadComponent ? requireComponentFunction().default : null
        return class Scene extends Component {
            constructor(props) {
                super(props);
                this.__InternalComponent = preloadComponent || requireComponentFunction().default
            }
            render() {
                return (
                    <Provider store={store}>
                        <this.__InternalComponent
                            ref="child"
                            {...this.props}
                        />
                    </Provider>
                );
            }

            componentDidAppear(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.componentDidAppear) {
                    instance.componentDidAppear(id);
                }
            }

            componentDidDisappear(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.componentDidDisappear) {
                    instance.componentDidDisappear(id);
                }
            }

            navigationButtonPressed(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.navigationButtonPressed) {
                    instance.navigationButtonPressed(id);
                }
            }
        };
    };

    registerContainer(containerName, generatorWrapper);
}

function registerContainer(containerName, generator) {
    Navigation.registerComponent(containerName, generator);
}

export default registerScreens = (store) => {
    
    registerContainerWithRedux(`gigabankclient.HomeScreen`, () => require('~/src/containers/Home'), store)
    registerContainerWithRedux(`gigabankclient.SplashScreen`, () => require('~/src/containers/SplashScreen'), store)
    registerContainerWithRedux(`gigabankclient.AnimatedScreen`, () => require('~/src/containers/AnimatedScreen'), store)
    registerContainerWithRedux(`gigabankclient.FeedScreen`, () => require('~/src/containers/FeedScreen'), store)
    
}