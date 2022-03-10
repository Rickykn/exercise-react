import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BandMemberPage = () => {
  const { bandMemberId } = useParams();
  const [memberList, setMemberList] = useState({});

  const fetchMemberList = () => {
    axios
      .get(`http://localhost:2000/band_members/${bandMemberId}`)
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("terjadi kesalahan di server");
      });
  };

  useEffect(() => {
    fetchMemberList();
  }, []);

  return (
    <div>
      <h1>{memberList.full_name}</h1>
      <ul>
        <li>Instrument: {memberList.instrument}</li>
        <li>Date of Birth: {memberList.date_of_birth}</li>
        <li>Hobby: {memberList.hobby}</li>
      </ul>
    </div>
  );
};

export default BandMemberPage;
