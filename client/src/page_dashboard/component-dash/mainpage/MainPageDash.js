import React from 'react';
import { Spin } from 'antd'

const MainPageDash = ({ children, loading = false }) => {
    return (
        <div>
            <Spin spinning={loading}>
                <div>
                    {children}
                </div>
            </Spin>
        </div>
    );
}

export default MainPageDash; 