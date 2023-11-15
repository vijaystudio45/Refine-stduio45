import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  DeleteButton,
  ShowButton,
  useSelect,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, setCurrent, setPageSize } = useTable({
    syncWithLocation: true,
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "category",
  });


  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          total: categorySelectProps?.options?.length,
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          onChange: (page) => {
            setCurrent(page);
          },
        }}
      >
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="category" title="Category" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
