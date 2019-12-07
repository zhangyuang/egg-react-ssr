import React from 'react'
import { renderToString }from 'react-dom/server'
import getComponent from '../src/getComponent'

describe('getComponent can return true component', () => {
  const Page = () => {
    return (
    <div>Page</div>
    )
  }
  const News = () => {
    return (
    <div>News</div>
    )
  }
  const Routes = [
    {
      path: '/',
      exact: true,
      Component: () => Page // 这里使用一个function包裹为了让它延迟require
    },
    {
      path: '/news/:id',
      exact: true,
      Component: () => News
    }
  ]
  test('get Page Component', () => {
    const activeComponent = getComponent(Routes,'/')()
    expect(renderToString(activeComponent)).toEqual('<div>Page</div>')
  })
  test('get News Component', async () => {
    const activeComponent = getComponent(Routes,'/news/1')()
    expect(renderToString(activeComponent)).toEqual('<div>News</div>')
  })
  test('get 404 Component', () => {
    const activeComponent = getComponent(Routes,'/404')()
    expect(renderToString(activeComponent)).toEqual('<div>路由查询404</div>')
  })
})
