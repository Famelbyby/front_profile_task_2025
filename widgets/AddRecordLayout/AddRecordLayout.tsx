import React from 'react';
import './AddRecordLayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type AppState } from '../../app/store';
import {
    addField,
    changeField,
    clearAllFields,
    deleteField,
} from '../../app/slices/AddRecordSlice';
import { MAX_FIELD_LENGTH } from '../../shared/Consts';
import { PostRecord } from '../../pages/TablePage/TablePageAPI';

const AddRecordLayoutHeader: React.FC = () => {
    return (
        <div className="add-record-header">
            <div className="add-record-title">Добавить запись</div>
            <div className="add-record-validation">
                *Максимальная длина поля - 25 символов
            </div>
        </div>
    );
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
    const { isWaitingForResponse } = useSelector(
        (state: AppState) => state.addRecord
    );
    const dispatch = useDispatch();

    return (
        <div
            className={
                'add-record-field-wrapper' +
                (isWaitingForResponse
                    ? ' add-record-field-wrapper_disabled'
                    : '')
            }
        >
            <input
                className="add-record-field__input"
                maxLength={MAX_FIELD_LENGTH}
                value={field}
                onChange={(event) => {
                    dispatch(
                        changeField({ index, newValue: event.target.value })
                    );
                }}
                disabled={isWaitingForResponse ? true : undefined}
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
    const { fields, isValidRecord, isWaitingForResponse } = useSelector(
        (state: AppState) => state.addRecord
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="add-record-footer">
            <div
                className={
                    'add-record-footer__send-button' +
                    (!isValidRecord || isWaitingForResponse
                        ? ' add-record-footer__send-button_forbidden'
                        : '')
                }
                onClick={() => {
                    if (!isValidRecord) {
                        return;
                    }

                    dispatch(PostRecord({ fields }));
                }}
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
