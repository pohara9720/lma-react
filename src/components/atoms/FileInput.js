import React, { useState } from 'react'
import { Field } from 'redux-form'
import cow from '../../app-assets/images/slider/cow.jpg'

const Uploader = ({ input, label, init, meta: { touched, error } }) => {
    const [preview, setPreview] = useState(init || cow)
    const onInputChange = (e) => {
        e.preventDefault();
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file)
        reader.onloadend = e => setPreview(reader.result)
        input.onChange(file);
    };
    return (
        <>
            <a className="mr-2" href="#">
                <img src={preview} alt="users avatar" className="users-avatar-shadow rounded-circle" height="64" width="64" />
            </a>
            <div className="media-body">
                <h4 className="media-heading">{label}</h4>
                <div className="col-12 px-0 d-flex">
                    <div>
                        <input type="file" onChange={onInputChange} accept="image/jpg, image/jpeg, image/png,.pdf,.csv" />
                        {touched && error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

const Attachment = ({ input, meta: { touched, error } }) => {
    console.log(error)
    const onInputChange = e => {
        const file = e.target.files[0];
        input.onChange(file)
    }
    return (
        <>
            <input type="file" onChange={onInputChange} accept=".pdf,.csv" />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}


const HeaderAvatar = ({ input, meta: { touched, error } }) => {
    const [preview, setPreview] = useState(null)
    const onInputChange = (e) => {
        e.preventDefault();
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file)
        reader.onloadend = e => setPreview(reader.result)
        input.onChange(file);
    };

    const onClick = id => {
        const el = document.getElementById(id)
        el.click()
    }
    return (
        <>
            {preview
                ? <img onClick={() => onClick('head-upload')} src={preview} className="avatar justify-content-center align-items-center" />
                : <div onClick={() => onClick('head-upload')} className="avatar justify-content-center align-items-center">
                    <i className='bx bx-plus' />
                </div>
            }
            <input id='head-upload' type='file' style={{ display: 'none' }} onChange={onInputChange} accept="image/jpg, image/jpeg, image/png" />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}
const ProfileAvatar = ({ input, meta: { touched, error } }) => {
    const [preview, setPreview] = useState(null)
    const onInputChange = (e) => {
        e.preventDefault();
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file)
        reader.onloadend = e => setPreview(reader.result)
        input.onChange(file);
    };
    const onClick = id => {
        const el = document.getElementById(id)
        el.click()
    }
    return (
        <>
            {preview
                ? <img onClick={() => onClick('prof-upload')} src={preview} className="card-content d-flex justify-content-center align-items-center" />
                : <div onClick={() => onClick('prof-upload')} className="card-content d-flex justify-content-center align-items-center">
                    <i className='bx bx-plus' />
                </div>
            }
            <input id='prof-upload' type='file' style={{ display: 'none' }} onChange={onInputChange} accept="image/jpg, image/jpeg, image/png" />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export const HeaderAvatarInput = (props) => <Field type='file' component={HeaderAvatar} {...props} />
export const ProfileAvatarInput = (props) => <Field type='file' component={ProfileAvatar} {...props} />

export const AvatarGroup = () => (
    <div className='card'>
        <ProfileAvatarInput name='profile_image' />
        <HeaderAvatarInput name='header_image' />
    </div>
)

export const FileInput = (props) => <Field type='file' component={Uploader} {...props} />

export const AttachmentInput = (props) => <Field type='file' component={Attachment} {...props} />
