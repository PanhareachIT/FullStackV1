import React, { useEffect, useState } from 'react'
import { Button, Modal, Space, Table, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { navi } from 'react-router-dom';
import { request } from '../../share/request'
import MainPageDash from '../component-dash/mainpage/MainPageDash'


const RoleCode = () => {
  const { role_id } = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [roleId, setRoleId] = useState(null)
  const [permissionId, setpermissionId] = useState(null)
  const [onShowModalDelete, setOnShowModalDelete] = useState(false)

  const handleGoBack = () => {
    navigate(-1)
  };
  const getList = () => {
    console.log(role_id)
    setLoading(true);
    request(`role_getPermissionCodeByRoleId/${role_id}`, "GET")
      .then(res => {
        setList(res.list);
        console.log(res.list)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onBtnDelete = (record) => {

    setOnShowModalDelete(true);
    setRoleId(record.role_id)
    setpermissionId(record.permission_id)
  };

  const onHildeModalDelete = () => {
    setOnShowModalDelete(false)
    setRoleId(null)
    setpermissionId(null)
  }

  const onDelete = () => {
    var param = {
      role_id: roleId,
      permission_id: permissionId
    }


    setLoading(true);
    request(`role_deleteRoleAndPermission`, "DELETE", param)
      .then(res => {
        setLoading(false);
        if (res) {
          getList()
          Modal.success({ content: res.message });
        } else {
          message.error("Something Went Wrong");
        }
      })
      .finally(() => {
        onHildeModalDelete()
      });
  };

  useEffect(() => {
    getList(); // Call getList when the component mounts or when role_id changes
  }, []);
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (item, record, index) => {
        return (
          index + 1
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Action',
      key: 'action',
      render: (item, record, index) => {
        return (
          <Space>
            <Button danger onClick={() => onBtnDelete(record)}>Delete</Button>
          </Space>
        )
      }

    }
  ];
  return (
    <MainPageDash loading={loading}>
      <div className='titlePageDashBoard'><h1>Permission of each role</h1></div>
      <Table pagination={false} dataSource={list} columns={columns} />
      <Button style={{ backgroundColor: '#cccccc', borderColor: '#cccccc', float: 'right', marginTop: '20px' }} onClick={handleGoBack}>
        Back
      </Button>
      <Modal
        title="Confirm Delete"
        // visible={visible}
        onCancel={onHildeModalDelete}
        open={onShowModalDelete}
        onOk={onDelete}
      >
        <p>Are you sure to remove this record</p>
      </Modal>
    </MainPageDash>
  )
}

export default RoleCode