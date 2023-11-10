import React from "react";
import { IResourceComponentsProps ,useMany} from "@refinedev/core";
import { Edit, useForm, useSelect,useTable } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

interface OptionType {
    label: string;
    value: number;
  }

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();


    const { tableProps, setCurrent, setPageSize } = useTable({
        syncWithLocation: true,
        pagination: {
            pageSize: 12,
        },
      });

      const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "category",
        ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
          enabled: !!tableProps?.dataSource,
        },
      });


    const blogPostsData = queryResult?.data?.data;

    const { selectProps: categorySelectProps } = useSelect({
        resource: "category",
        defaultValue: blogPostsData?.category?.id,
    });

    const getCategoryNameFromId = (id: number) => {
        if (categoryData && categoryData.data) {
          const category = categoryData.data.find((category) => category.id === id);
          return category ? category.category : "Category Not Found";
        } else {
          return "Category Data Not Available";
        }
      };

      const mappedOptions: OptionType[] = categorySelectProps?.options?.map((option) => {
        const value = option.value;
        if (typeof value === 'number') {
          return {
            label: getCategoryNameFromId(value),
            value: value,
          };
        } else {
          // Handle the case where value is not a number
          return {
            label: "Default Label", // Provide a default label
            value: 0, // Provide a default value
          };
        }
      }) || [];


    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category_id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {/* <Select {...categorySelectProps} /> */}
                    <Select options={mappedOptions} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name={["status"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
