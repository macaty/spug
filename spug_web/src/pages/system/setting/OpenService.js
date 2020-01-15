/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the MIT License.
 */
import React from 'react';
import {observer} from 'mobx-react';
import {Button, Form, Input, message} from 'antd';
import styles from './index.module.css';
import http from 'libs/http';
import store from './store';
import lds from 'lodash';


export default observer(function () {
  function handleSubmit() {
    store.loading = true;
    const value = lds.get(store.settings, 'api_key.value');
    http.post('/api/setting/', {data: [{key: 'api_key', value}]})
      .then(() => {
        message.success('保存成功');
        store.fetchSettings()
      })
      .finally(() => store.loading = false)
  }

  return (
    <React.Fragment>
      <div className={styles.title}>开放服务设置</div>
      <Form style={{maxWidth: 320}}>
        <Form.Item colon={false} label="访问凭据">
          <Input
            value={lds.get(store.settings, 'api_key.value')}
            onChange={e => lds.set(store.settings, 'api_key.value', e.target.value)}
            placeholder="请输入"/>
        </Form.Item>
        <Button type="primary" loading={store.loading} onClick={handleSubmit}>保存设置</Button>
      </Form>
    </React.Fragment>
  )
})
