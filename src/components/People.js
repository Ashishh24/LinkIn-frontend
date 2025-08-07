const People = (props) => {
    // console.log("propssss", props);
    
    const {firstName, lastName, bio, profilePhoto} = props.data;

    // console.log(firstName);
    // console.log(lastName);
    // console.log(profilePhoto);       
    return (
        <div className="flex border border-[#ccc] w-[50%] align-middle text-center p-5 mx-auto mt-5 dark:bg-gray-700 dark:border-gray-600">
            {/*profile photo*/}
            <div className="w-[15%]"> 
                <img className="w-20 rounded-full border-black" src={profilePhoto} />
            </div> 
            <div className="flex w-[90%] items-center">
                <div className="w-[90%]">
                    <div className="flex space-x-2 text-xl">
                        {/*first name*/}
                        <div>
                            <h1>{firstName}</h1>
                        </div>
                        {/*last name*/}
                        <div>
                            <h1>{lastName}</h1>
                        </div>
                    </div>
                    <div className="text-left">
                        {bio}
                    </div>
                </div>
                <div>
                    {/*connect*/}
                    <div>
                        <button className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-[#2E78B6] hover:text-white ">Connect</button>
                    </div>
                    {/* <div></div> *ignore */}
                </div>
            </div>
        </div>
    )
};

export default People;