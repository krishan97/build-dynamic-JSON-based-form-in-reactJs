import React from 'react'

export const CheckBoxField = (data) => {
    
    return ( 
        <div key={`inline-${data.field.type}`} className="mb-3"> 
            <data.Form.Group>
                <data.Form.Label > {(data.field.required) ? (<><span className='text-danger'>* </span> <strong>{data.field.label}</strong> </>) :<strong>{data.field.label}</strong>} </data.Form.Label>
                {data.field.options.map((x, index) => (
                    <data.Form.Check key={index} className={'p-2'} name={data.field.name} inline
                     label={x.label} value={x.value}  defaultChecked={((data.field.value).split(',').indexOf(x.value)>-1)? true: false}
                     type={data.field.type} id={`inline-${data.field.name}-${data.field.type}-${index}-${index}`} onClick={() => data.handleCheckBoxClick(data.index, x.value)} />
                ))}
                   <div className={(data.error[data.field.name] !== void 0 && data.error[data.field.name].length) ? "invalid-feedback d-block" : ""}>{data.error[data.field.name]}</div>
            </data.Form.Group>
    
        </div>
    )

}

