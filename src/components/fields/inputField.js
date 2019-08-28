import React from 'react'
export const InputField = (data) => (
    <data.Form.Group>
        <data.Form.Label > {(data.field.required) ? (<><span className='text-danger'>* </span> {data.field.label} </>) : data.field.label} </data.Form.Label>
        <data.Form.Control type={data.field.type} placeholder={data.field.placeholder} name={data.field.name} value={data.field[data.field.value]} onChange={data.handleChange.bind(this, data.index)} />
        <div className={(data.error[data.field.name] !== void 0 && data.error[data.field.name].length) ? "invalid-feedback d-block" : ""}>{data.error[data.field.name]}</div>
    </data.Form.Group>
)

