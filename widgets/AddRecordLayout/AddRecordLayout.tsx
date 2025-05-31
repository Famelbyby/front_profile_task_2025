import React from 'react';
import './AddRecordLayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppState } from '../../app/store';
import {
    addField,
    changeField,
    clearAllFields,
    deleteField,
} from '../../app/slices/AddRecordSlice';
import { MAX_FIELD_LENGTH } from '../../shared/Consts';

const AddRecordLayoutHeader: React.FC = () => {
    return <div className="add-record-header">Добавить запись</div>;
};

interface AddRecordInputProps {
    index: number;
    field: string;
    isMinimalLength: boolean;
}

const AddRecordInput: React.FC<AddRecordInputProps> = ({
    field,
    index,
    isMinimalLength,
}) => {
    const dispatch = useDispatch();

    return (
        <div className="add-record-field-wrapper">
            <input
                className="add-record-field__input"
                maxLength={MAX_FIELD_LENGTH}
                value={field}
                onChange={(event) => {
                    dispatch(
                        changeField({ index, newValue: event.target.value })
                    );
                }}
            />
            <img
                className={
                    'add-record-field__delete-img' +
                    (isMinimalLength
                        ? ' add-record-field__delete-img_not-allowed'
                        : '')
                }
                src="/delete.png"
                onClick={() => {
                    dispatch(deleteField(index));
                }}
            />
        </div>
    );
};

const AddRecordLayoutFields: React.FC = () => {
    const { fields } = useSelector((state: AppState) => state.addRecord);
    const dispatch = useDispatch();

    const isMinimalLength = fields.length === 5;
    const isMaxLength = fields.length === 15;

    return (
        <div className="add-record-fields">
            {fields.map((field, index) => {
                return (
                    <AddRecordInput
                        key={index}
                        index={index}
                        field={field}
                        isMinimalLength={isMinimalLength}
                    />
                );
            })}
            {!isMaxLength && (
                <div
                    className="add-record-add-field"
                    onClick={() => {
                        dispatch(addField());
                    }}
                >
                    <img
                        className="add-record-add-field__plus-img"
                        src="/add-field.png"
                    />
                </div>
            )}
        </div>
    );
};

const AddRecordLayoutFooter: React.FC = () => {
    const { isValidRecord } = useSelector((state: AppState) => state.addRecord);
    const dispatch = useDispatch();

    return (
        <div className="add-record-footer">
            <div
                className={
                    'add-record-footer__send-button' +
                    (!isValidRecord
                        ? ' add-record-footer__send-button_forbidden'
                        : '')
                }
            >
                Добавить
            </div>
            <div
                className="add-record-footer__clear-all"
                onClick={() => {
                    dispatch(clearAllFields());
                }}
            >
                Очистить
            </div>
        </div>
    );
};

const AddRecordLayout: React.FC = () => {
    return (
        <div className="add-record-layout">
            <AddRecordLayoutHeader />
            <AddRecordLayoutFields />
            <AddRecordLayoutFooter />
        </div>
    );
};

export default AddRecordLayout;
