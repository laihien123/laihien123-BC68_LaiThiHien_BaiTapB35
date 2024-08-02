import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookSeat, removeSeat } from "../../redux/seatSlice";
import Summary from "../Summary/Summary";

const Screen = () => {
  const dispatch = useDispatch();
  const { arrGhe, gheDangDat } = useSelector((state) => state.seatSlice);

  const handleGhe = (seat) => {
    dispatch(bookSeat(seat));
  };

  const removeGhe = (seat) => {
    dispatch(removeSeat(seat));
  };

  const total = gheDangDat.reduce((sum, ghe) => sum + ghe.gia, 0);

  return (
    <div className="container">
      <div className="Screen">
        <div className="screen-title">
          <h1 className="m-8">Đặt vé xem phim tại Cyberlearn.VN</h1>
          <p className="screen text-center text-3xl">Màn Hình</p>
        </div>
        <div className="screen-seat">
          <div className="screen-container">
            {arrGhe.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row rowNumber">
                <div className="firstChar">{row.hang}</div>
                {row.danhSachGhe.map((seat, seatIndex) => {
                  const isSelected = gheDangDat.some(
                    (item) => item.soGhe === seat.soGhe
                  );
                  return seat.daDat ? (
                    <button className="gheDuocChon" key={seatIndex} disabled>
                      {seat.soGhe}
                    </button>
                  ) : (
                    <button
                      className={
                        isSelected ? "gheDangChon" : "ghe hover:bg-slate-600"
                      }
                      key={seatIndex}
                      onClick={() => handleGhe(seat)}
                    >
                      {seat.soGhe}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Summary
        arrGhe={arrGhe}
        gheDangDat={gheDangDat}
        total={total}
        removeGhe={removeGhe}
      />
    </div>
  );
};

export default Screen;
