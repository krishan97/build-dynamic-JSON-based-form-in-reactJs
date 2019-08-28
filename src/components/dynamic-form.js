import React, { Component } from 'react'
import { Container, Col, Row, Form, Button, } from 'react-bootstrap'
import { InputField, CheckBoxField, RadioBoxField, SelectsBox } from './fields/index'
class DynamicForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: [{
                label: 'First Name',
                type: 'text',
                name: 'firstName',
                required: true,
                placeholder: 'Enter the first name',
                value: ''
            },
            {
                label: 'Last Name',
                name: 'lastName',
                type: 'text',
                required: true,
                placeholder: 'Enter the last name',
                value: ''
            },
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                required: true,
                placeholder: 'Enter the email name',
                value: ''
            },
            {
                label: 'Age',
                name: 'age',
                type: 'number',
                required: false,
                placeholder: 'Enter the age',
                value: ''
            },
            {
                label: 'Gender',
                name: 'gender',
                type: 'radio',
                required: true,
                value: '',
                options: [
                    {
                        label: 'Male',
                        value: 'male'
                    },
                    {
                        label: 'Female',
                        value: 'female'
                    }
                ]
            },
            {
                label: 'Hobbies',
                name: 'hobbies',
                type: 'checkbox',
                required: true,
                value: '',
                options: [
                    {
                        label: 'Painting',
                        value: 'painting'
                    },
                    {
                        label: 'Sports',
                        value: 'sports'
                    },
                    {
                        label: 'Traveling',
                        value: 'traveling'
                    },
                    {
                        label: 'Dancing',
                        value: 'dancing'
                    }
                ]
            },
            {
                label: 'State',
                name: 'state',
                type: 'select',
                required: true,
                value: '',
                options: [
                    {
                        label: 'India',
                        value: 'in'
                    },
                    {
                        label: 'USA',
                        value: 'usa'
                    },
                    {
                        label: 'UK',
                        value: 'uk'
                    },
                    {
                        label: 'Australia',
                        value: 'aus'
                    }
                ]
            },
            ],
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        document.title = "Dynamic Form"
    }

    handleClick = (index, value) => {
        let fields = this.state.fields
        fields[index].value = value
        this.setState({ fields });
    }
    handleCheckBoxClick = (index, value) => {
        let fields = this.state.fields
        let arr = fields[index].value.trim().split(',').filter(x => x.trim() !== '');
        const indexx = arr.indexOf(value);
        (indexx > -1) ? arr.splice(indexx, 1) : arr.push(value)
        fields[index].value = arr.toString()
        this.setState({ fields });
    }

    handleChange = (index, e) => {
        let fields = this.state.fields
        fields[index].value = e.target.value
        this.setState({ fields });
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    handleValidation = () => {
        const fields = this.state.fields;
        // eslint-disable-next-line no-useless-escape
        const emailField = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let errors = {};
        let formIsValid = true;
        fields.map((x) => {
            if (x.required && x.value.trim().length === 0) {
                formIsValid = false;
                errors[x.name] = `${this.capitalizeFirstLetter(x.label)} cannot be empty`;
            } else if (x.type === 'email' && emailField.test(x.value.trim()) === false) {
                formIsValid = false;
                errors[x.name] = `${this.capitalizeFirstLetter(x.label)} is invalid`;
            }
            return errors;
        })
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleFormKeyAndValue = (data) => {
        let values = {}
        data.map((x) => values[x.name] = x.value)
        return values
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.handleValidation()) {
            const formData = this.handleFormKeyAndValue(this.state.fields)
            alert(JSON.stringify(formData));
        }

    }
    render() {
        return (
            <Container className={`p-3`} >
                <Row>
                    <Col className={`col-md-12 text-center`}><h2>Dynamic Form</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit} >
                            <Row>
                                {this.state.fields.map((x, index) => (
                                    <Col key={index} className={`col-md-6`}>
                                        {
                                            (['text', 'password', 'email', 'number', 'tel'].indexOf(x.type) > -1) ? <InputField index={index} Form={Form} field={x} error={this.state.errors} handleChange={this.handleChange} /> : ''

                                        }
                                        {
                                            (['checkbox'].indexOf(x.type) > -1) ? <CheckBoxField index={index} Form={Form} field={x} error={this.state.errors} handleCheckBoxClick={this.handleCheckBoxClick} /> : ''
                                        }
                                        {
                                            (['radio'].indexOf(x.type) > -1) ? <RadioBoxField index={index} Form={Form} field={x} error={this.state.errors} handleClick={this.handleClick} /> : ''
                                        }
                                        {
                                            (['select'].indexOf(x.type) > -1) ? <SelectsBox index={index} Form={Form} field={x} error={this.state.errors} handleClick={this.handleChange} /> : ''
                                        }

                                    </Col>
                                ))}

                            </Row>

                            <div className={`text-right mt-2`}>
                                <Button variant="primary" type="submit" >Submit </Button>
                            </div>
                            <Row className={`text-center mt-3`}>
                            <Col className={`col-md-12`}>
                                <Form.Group>
                                    <Form.Label>JSON </Form.Label>
                                    <Form.Control rows={5} as="textarea">{JSON.stringify(this.state.fields)}</Form.Control>
                                </Form.Group>
                             </Col>
                            </Row>

                        </Form>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default DynamicForm