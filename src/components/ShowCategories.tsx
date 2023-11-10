import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Category</Title>
            <TextField value={record?.category} />
        </Show>
    );
};
