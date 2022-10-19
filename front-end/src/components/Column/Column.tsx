import { useState, useEffect } from "react";
import "./Column.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const Column = () => {
    return (
        <div className={"column"}>
            <div className={"column__container"}>
                <div className={"column__header"}>
                    <input
                        type={"text"}
                        id={"title"}
                        value={"Column title"}
                        placeholder={"Title"}
                        autoFocus
                        required
                    />
                    <DeleteOutlined />
                </div>
                <div className={"column__addnew"}>
                    <PlusOutlined />
                    <span>Add a card</span>
                </div>
            </div>
        </div>
    );
};

export default Column;
