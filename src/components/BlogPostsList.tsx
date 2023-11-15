import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  MarkdownField,
  DateField,
  useSelect,
  FilterDropdown,
} from "@refinedev/antd";

import { Table, Space, Radio } from "antd";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, setCurrent, setPageSize } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 12,
    },
  });

  // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
  //   resource: "category",
  //   ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
  //   queryOptions: {
  //     enabled: !!tableProps?.dataSource,
  //   },
  // });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "category",
    ids: [], // Pass an empty array for ids to fetch all categories
    queryOptions: {
      enabled: true, // Fetch all categories regardless of ids
    },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "category",
  });


  const { selectProps: blogSelectProps } = useSelect({
    resource: "blog",
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          total: blogSelectProps?.options?.length,
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
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="content"
          title="Content"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categorySelectProps?.options?.find((item) => item.value === value)
              ?.label

          }
        />
        <Table.Column dataIndex="status" title="Status" />
        {/* <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        /> */}
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
