// Copyright 2021 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
  * This is a sample Looker Extension written in typescript and React. It imports one component, <HelloWorld>.
  * HelloWorld makes a simple call to the Looker API using the Extension Framework's built in authentication,
  * and returns the logged in user.
*/
import React from 'react'
import { ExtensionProvider,ExtensionContext } from '@looker/extension-sdk-react'
import { IDashboard, Looker40SDK } from '@looker/sdk'
import { hot } from 'react-hot-loader/root'

export const App = hot(() => (
  <ExtensionProvider>
   <HomePage />
  </ExtensionProvider>
))

const HomePage = () => {
  const { core40SDK, extensionSDK } = React.useContext(ExtensionContext)
  const [dashboards, setDashboards] = React.useState<IDashboard[]>([])

  const parseDate = (date: any) => {
    let newDate = new Date(date)
    return newDate.toLocaleDateString()
  }
  
  React.useEffect(() => {
    /**
     * This is a simple example of making a call to the Looker SDK to fetch the dashboards from a single folder
     * The SDK is already authenticated by the Extension Framework, so we can simply call the SDK methods
     * To adapt to your Looker instance, change the folder id in the call to core40SDK.folder_dashboards
    */
    core40SDK.ok(core40SDK.folder_dashboards('39',"id,title,dashboard_elements,view_count,updated_at")).then((dashboards) => {
      return setDashboards(dashboards)
    })
  },[])

  let component;
  if (dashboards !== undefined) {
    component =  (

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundImage: 'linear-gradient(to right, #fbc2eb 0%, #a6c1ee 100%)',
        zIndex: -1,
        position:'fixed',
        height: '120vh',
        width: '120vw'
      }}></div>
      {dashboards.map((dashboard: any) => {
        return (
          <div 
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={() => {
            console.log('clicked')
            extensionSDK.updateLocation(`/dashboards/${dashboard.id}`)}
          }
          className='scrollbar'
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: "25%",
            height: '25%',
            justifyContent:'space-between',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            margin: '0.9rem',
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(5px)',
            alignItems: 'center',
            WebkitBackdropFilter: 'blur(5px)',
            overflow: 'hidden'
          }}>
            <div style={{
              height: 'auto',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.2)',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding:'0.2rem'
              }}>
              <p>
                <b>
                  {dashboard.title}
                </b>
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding:'0rem'
              }}>
                <p style={{padding:0,margin:0}}><span>View Count: </span> {dashboard.view_count}</p>
                <p style={{padding:0,margin:0}}><span>Last Updated: </span> {parseDate(dashboard.updated_at)}</p>
              </div>
            </div>
            </div>
            <div style={{height:'100%', width:'100%',overflowY:'scroll',padding:'0.2rem'}}>
            {dashboard.dashboard_elements.map((element: any) => {
              return (
                <>
                  <p style={{padding:'0.2rem',margin:0}}><div dangerouslySetInnerHTML={{__html:element.title}}/></p>
                </>
              )
            })
            }
            </div>
          </div>
        )
      })}
    </div>
  )
  } 

  return (
    <>
    {component}
    </>
  )
}