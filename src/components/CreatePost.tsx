import React from "react";
import { IResourceComponentsProps,useMany } from "@refinedev/core";
import { Create, useForm, useSelect ,useTable} from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

interface OptionType {
    label: string;
    value: number;
  }

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {

    const { formProps, saveButtonProps, queryResult} = useForm();

    const { selectProps: categorySelectProps } = useSelect({
        resource: "category",
    });


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


      const getCategoryNameFromId = (id: number) => {
        if (categoryData && categoryData.data) {
          const category = categoryData.data.find((category) => category.id === id);
          return category ? category.category : "Category Not Found";
        } else {
          return "Category Data Not Available";
        }
      };

    // const mappedOptions = categorySelectProps.options.map((option) => ({
    //     label: getCategoryNameFromId(option.value), // Replace with your actual function to get category name from ID
    //     value: option.value,
    //   }));

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
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                    name={["category"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {/* <Select {...mappedOptions} /> */}
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
        </Create>
    );
};
