function test() {
	const gridButtons2 = ["박스 병합", "박스 분할", "출고 취소", "저장"];

	const onClick2 = (key) => {
		switch (key) {
			case "박스 병합":
				setCheckMsg(msgList[4]);
				orderRelease("박스 병합");
				setCheckMsg("주문 내 박스 병합을 진행하시겠습니까?");
				break;
			case "박스 분할":
				setCheckMsg(msgList[5]);
				orderRelease("박스 분할");
				setCheckMsg("주문 내 박스 분할을 진행하시겠습니까?");
				break;
			case "출고 취소":
				setCheckMsg(msgList[6]);
				orderRelease("출고 취소");
				setCheckMsg("주문 내 출고 취소를 진행하시겠습니까?");
				break;
			case "저장":
				if (goods.length == 0) {
					alert("주문 상품 목록이 없습니다.");
					return;
				}

				if (checkMsg.indexOf("주문 내 ") != -1) {
					// 위 3버튼 중 하나 눌렀으면
					setCheckType(10);
					submitToggle();
				} else {
					alert("저장할 내용이 없습니다.");
					return;
				}
				break;
		}
	};

	const orderRelease = async (msg) => {
		const body = getCheckedRowsItems("goods"); //선택한 주문상품목록

		if (body) {
			const checkedGoods = body.length;
			if (checkedGoods > 1 && msg == "박스 분할") {
				return alert("동시에 여러개의 상품을 박스분할 할 수 없습니다.");
			}
		}

		const body2 = getGridData("goods"); //선택한 주문상품목록
		const orderBody = getGridData("gridOrder"); //주문건의 상태 확인위한 주문 목록
		const getBoxNo = goods.map((item) => {
			return Number(item.boxNo.split("-")[3].slice(1, 100));
		});
		const maxBoxNo = Math.max.apply(null, getBoxNo) + 1;

		let alMsg = "";
		let delRow = []; // 출고 취소 시 삭제할 row
		let checkRow = []; // 박스 병합 시 박스 번호 중복확인 위한 row
		let dtRow = []; // 박스 병합 가능 확인 위한 유통기한row
		let cdRow = []; // 박스 병합 가능 확인 위한 상품row
		let mergeItem = "";
		let boxNoList = [];
		let _boxNo = ""; // 박스 병합 시 부여할 박스번호
		let _inRow = [];
		let mergeItemList = [];
		let _editRow = [];

		_editRow.push(body2.length); // 기존 주문상품목록의 길이를 첫번째에 넣음

		if (body == undefined) return; // 체크 안했으면 리턴

		let _boxCount = boxCount;

		body.map((item) => {
			const resultBoxNo = item.item.boxNo.split("-");

			const BoxNo = `${resultBoxNo[0]}-${resultBoxNo[1]}-${resultBoxNo[2]}-B${
				maxBoxNo < 10 ? `0${String(maxBoxNo)}` : String(maxBoxNo)
			}`;

			orderBody.map((oItem) => {
				if (item.item.odrNo == oItem.odrNo) {
					/// 박스 병합, 박스 분할, 출고 취소 모두 해당 주문의 상태가 출고요청 상태인 주문만 가능
					if (oItem.oprnPstCd != "출고요청") {
						alMsg = "출고 요청 상태의 주문만 " + msg + " 가능합니다.";
					}
				}
			});
			delRow.push(item.rowIndex);
			if (msg == "출고 취소") {
				// delRow.push(item.rowIndex);
				//출고 취소는 선택한 상품 상태가 출고작업중이면 불가
				if (item.item.odrStCd == "출고작업중") {
					alMsg = "출고작업중 상태의 상품은 취소 불가합니다.";
				}
			} else if (msg == "박스 병합") {
				// delRow.push(item.rowIndex); // 머지 할 경우 삭제 후 넣기 위함
				checkRow.push(item.item.boxNo); //동일한 박스 번호 여부 체크 위함

				dtRow.push(item.item.shTmlmDt);
				cdRow.push(item.item.gdsCd);
				boxNoList.push(item.item.boxNo); //박스번호 오름차순 정렬하여 추출위함
				mergeItemList.push(item.item);
				mergeItem = item.item;
			} else if (msg == "박스 분할") {
				//2개담기
				_inRow.unshift(
					{
						abEdCd: item.item.abEdCd,
						abWkAttr: item.item.abWkAttr,
						bcd: item.item.bcd,
						boxNo: item.item.boxNo,
						coGdsCd: item.item.coGdsCd,
						coNm: item.item.coNm,
						coOdrNo: item.item.coOdrNo,
						dlCo: item.item.dlCo,
						gdsCd: item.item.gdsCd,
						gdsNm: item.item.gdsNm,
						invoNo: item.item.invoNo,
						maxBoxCnt: item.item.maxBoxCnt,
						mkDt: item.item.mkDt,
						odrCnt: item.item.odrCnt,
						odrCrtDt: item.item.odrCrtDt,
						odrNo: item.item.odrNo,
						odrStCd: item.item.odrStCd,
						perBoxCnt: item.item.perBoxCnt,
						shTmlmDt: item.item.shTmlmDt,
						addYn: true,
						addCount:
							item.item.addCount != undefined /// 이미 분할한 것이면 같은값 유지
								? item.item.addCount
								: _boxCount,
					},
					{
						abEdCd: item.item.abEdCd,
						abWkAttr: item.item.abWkAttr,
						bcd: item.item.bcd,
						boxNo: BoxNo,
						coGdsCd: item.item.coGdsCd,
						coNm: item.item.coNm,
						coOdrNo: item.item.coOdrNo,
						dlCo: item.item.dlCo,
						gdsCd: item.item.gdsCd,
						gdsNm: item.item.gdsNm,
						invoNo: item.item.invoNo,
						maxBoxCnt: item.item.maxBoxCnt,
						mkDt: item.item.mkDt,
						odrCnt: item.item.odrCnt,
						odrCrtDt: item.item.odrCrtDt,
						odrNo: item.item.odrNo,
						odrStCd: item.item.odrStCd,
						perBoxCnt: item.item.perBoxCnt,
						shTmlmDt: item.item.shTmlmDt,
						addYn: true,
						addCount:
							item.item.addCount != undefined /// 이미 분할한 것이면 같은값 유지
								? item.item.addCount
								: _boxCount,
					}
				);

				//2개담기

				if (item.item.addCount == undefined) {
					_boxCount += 1;
				}

				_editRow.push(item.rowIndex); // 입력 가능한 row 체크 위한 선택한 입력row 값
			}
		});
		setBoxCount(_boxCount);

		setInRowCount(inRowCount == 0 ? _inRow.length : inRowCount + _inRow.length);

		if (alMsg != "") {
			// 알림메시지가 있을 경우 알림 후 리턴
			alert(alMsg);
			return;
		}

		if (msg == "출고 취소") {
			setGoods(
				goods.filter((item, index) =>
					delRow.find((i) => i === index) !== undefined ? null : item
				)
			);
			delRow = []; //초기화
		} else if (msg == "박스 병합") {
			if (boxNoList.length > 0) {
				boxNoList.sort((a, b) => {
					if (a > b) {
						return 1;
					} else if (a < b) {
						return -1;
					} else {
						return 0;
					}
				});

				_boxNo = boxNoList[0];
			}

			const checkSet = new Set(checkRow);
			const checkSetA = [...checkSet];

			//1. 동일 박스번호 유무 확인
			if (checkRow.length != checkSetA.length) {
				alert("동일한 박스번호 상품은 병합이 불가합니다."); // alMsg = '동일한 박스번호 상품은 병합이 불가합니다.';
				return;
			}

			// 2. 동일 주문, 상품, 유통기한 인지 확인
			const dtSet = new Set(dtRow); //유통기한중복확인
			const dtUniqueA = [...dtSet];
			const cdSet = new Set(cdRow); //상품명 중복확인
			const cdUniqueA = [...cdSet];

			let merType = 0;

			if (dtUniqueA && cdUniqueA) {
				let mList = goods.filter(
					(
						item,
						index // 체크한 로우 제외한 리스트들 따로 추출
					) => (delRow.find((i) => i === index) !== undefined ? null : item)
				);

				if (cdUniqueA.length == 1) {
					// 동일상품
					if (dtUniqueA.length == 1) {
						//동일유통기한
						let mergeItem = "";

						let _odrCnt = 0; // 주문수량
						let _perBoxCnt = 0; // 박스 내 수량

						mergeItemList.map((i) => {
							_odrCnt += i.odrCnt;
							_perBoxCnt += i.perBoxCnt;
						});

						mergeItem = {
							//체크한 로우 의 병합
							abEdCd: mergeItemList[0].abEdCd,
							abWkAttr: mergeItemList[0].abWkAttr,
							bcd: mergeItemList[0].bcd,
							boxNo: _boxNo,
							coGdsCd: mergeItemList[0].coGdsCd,
							coNm: mergeItemList[0].coNm,
							coOdrNo: mergeItemList[0].coOdrNo,
							dlCo: mergeItemList[0].dlCo,
							gdsCd: mergeItemList[0].gdsCd,
							gdsNm: mergeItemList[0].gdsNm,
							invoNo: mergeItemList[0].invoNo,
							maxBoxCnt: mergeItemList[0].maxBoxCnt,
							mkDt: mergeItemList[0].mkDt,
							odrCnt: _odrCnt,
							odrCrtDt: mergeItemList[0].odrCrtDt,
							odrNo: mergeItemList[0].odrNo,
							odrStCd: mergeItemList[0].odrStCd,
							perBoxCnt: _perBoxCnt,
							shTmlmDt: mergeItemList[0].shTmlmDt,
						};

						setGoods([mergeItem].concat(mList));
					} else {
						//동일상품&다른유통기한
						merType = 1;
					}
				} else {
					//다른상품
					merType = 1;
				}

				if (merType == 1) {
					// 동일상품&다른유통기한 or 다른상품 -> 같은 처리방식이라 따로 뺌
					let _mergeItemList = "";
					mergeItemList.map((i, index) => {
						_mergeItemList = {
							abEdCd: i.abEdCd,
							abWkAttr: i.abWkAttr,
							bcd: i.bcd,
							boxNo: _boxNo, // 박스번호만 병합
							coGdsCd: i.coGdsCd,
							coNm: i.coNm,
							coOdrNo: i.coOdrNo,
							dlCo: i.dlCo,
							gdsCd: i.gdsCd,
							gdsNm: i.gdsNm,
							invoNo: i.invoNo,
							maxBoxCnt: i.maxBoxCnt,
							mkDt: i.mkDt,
							odrCnt: i.odrCnt,
							odrCrtDt: i.odrCrtDt,
							odrNo: i.odrNo,
							odrStCd: i.odrStCd,
							perBoxCnt: i.perBoxCnt,
							shTmlmDt: i.shTmlmDt,
						};
						mergeItemList[index] = _mergeItemList;
					});

					setGoods(mergeItemList.concat(mList));
				}
			}
		} else if (msg == "박스 분할") {
			setEditRow(_editRow); //
			setGoods(
				_inRow.concat(
					goods.filter((item, index) =>
						delRow.find((i) => i === index) !== undefined ? null : item
					)
				)
			); // 동일한 row 생성 , 생성된 row 상단으로
		}
	};

	return (
		<div>
			{gridButtons2.map((item, index) => {
				return (
					<span key={index} className="mv-5">
						<Button
							key={"btn_grid_" + index}
							title={item}
							width={80}
							onClick={() => {
								onClick2(item);
							}}
						/>
					</span>
				);
			})}
		</div>
	);
}
