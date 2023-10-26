import './Addresses.scss'
import { useState, useEffect } from 'react'
import axiosInstance from '../../axios'
import { toast, Toaster } from 'react-hot-toast'

const Addressess = (user_id) => {
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [country, setCountry] = useState('')

    const fetchAddresses = async () => {
        const res = await axiosInstance().get('/get-addresses')
        console.log(res.data.addresses)
        setAddresses(res.data.addresses)
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleClick = (id) => {
        if (id === 'add-address') {
            document.querySelector('.add-address-form').showModal()
        }
        else if (id === 'close') {
            document.querySelector('.add-address-form').close()
        }
    }

    const addAddress = (e) => {
        e.preventDefault();

        const data = {
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            country: country
        }

        axiosInstance().post('/add-address', data)
            .then(res => {
                console.log(res.data)
                fetchAddresses()

                setAddress('')
                setCity('')
                setState('')
                setPincode('')
                setCountry('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteAddress = ( e, id ) => {
        e.preventDefault();
        axiosInstance().delete(`/delete-address/${id}`)
            .then(res => {
                console.log(res.data)
                fetchAddresses()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="address-container">
                <h2>Your Saved Addresses :</h2>
                {
                    <table>
                        <thead>
                            <tr className='address-table-header'>
                                <th>S.No</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addresses.map((address, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{address.address}</td>
                                        <td>{address.city}</td>
                                        <td>{address.state}</td>
                                        <td>{address.pincode}</td>
                                        <td>{address.country}</td>
                                        <td>
                                            {/* <button className="edit-address">Edit</button> */}
                                            <button className="delete-address" onClick={(e) => {
                                                deleteAddress(e, address._id)
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

                <button className="add-address" onClick={() => { handleClick('add-address') }}>Add Address</button>

                <dialog className='add-address-form'>
                    <form onSubmit={addAddress}>
                        <div className="add-address-heading">
                            <h2>Add Address</h2>
                            <button className="close" onClick={() => { handleClick('close') }}>X</button>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} placeholder="Enter your address" required />
                        </div>

                        <div>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" placeholder="Enter your city" onChange={(e) => {
                                setCity(e.target.value)
                            }} required />
                        </div>

                        <div>
                            <label htmlFor="state">State</label>
                            <input type="text" id="state" placeholder="Enter your state" onChange={(e) => {
                                setState(e.target.value)
                            }} required />
                        </div>

                        <div>
                            <label htmlFor="pincode">Pincode</label>
                            <input type="number" id="pincode" placeholder="Enter your pincode" onChange={(e) => {
                                setPincode(e.target.value)
                            }} required />
                        </div>

                        <div>
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" placeholder="Enter your country" onChange={(e) => {
                                setCountry(e.target.value)
                            }} required />
                        </div>

                        <button className="add-address-button" type='submit'>Add Address</button>
                    </form>
                </dialog>
            </div>
        </>
    )
}

export default Addressess