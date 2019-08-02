FROM ethereum/client-go:alltools-stable

ADD eth_passwd /usr/share/eth_passwd
ADD key.str /usr/share/key.str
ADD genesis.json /usr/share/genesis.json

RUN geth account import --password /usr/share/eth_passwd /usr/share/key.str
RUN geth init /usr/share/genesis.json

EXPOSE 8546 30303 30303/udp
ENTRYPOINT ["geth"]