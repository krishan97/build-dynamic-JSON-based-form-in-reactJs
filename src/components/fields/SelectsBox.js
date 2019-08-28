import React from 'react'

export const SelectsBox = (data) => {
    
    return ( 
        <div key={`inline-${data.field.type}`} className="mb-3"> 
            <data.Form.Group>
                <data.Form.Label > {(data.field.required) ? (<><span className='text-danger'>* </span> <strong>{data.field.label}</strong> </>) :<strong>{data.field.label}</strong>} </data.Form.Label>
                <data.Form.Control as="select" name={data.field.name}  onChange={data.handleClick.bind(this, data.index)} value={data.field.value}  > 
                <option value=""   >Please Select the Options</option>
                {data.field.options.map((x, index) => (
                     <option  key={index} value={x.value} > {x.label} </option>
                ))}
                </data.Form.Control>
                   <div className={(data.error[data.field.name] !== void 0 && data.error[data.field.name].length) ? "invalid-feedback d-block" : ""}>{data.error[data.field.name]}</div>
            </data.Form.Group>
    
        </div>
    )

}

