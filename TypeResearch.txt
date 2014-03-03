Firewall Evolution:

Packet Filters: First type of firewall and worked on a more simple premise than the later methods. First developed in 1988 by engineers at DEC.

This type of firewall is basic and works by looking at the packets that are sent with computers on the internet. It checks each packet that comes through it against a set of rules that it holds. If a packet is detected then it will either discretely not let it through or it will send an error message to the source of the packet.

The filtering is based not on the stream of information that the packet is contained within but instead pays attention to details about the packet itself, such as: addresses and the protocol that it is following.

Operates mainly on the first three layers of the OSI reference model. (Don't go into much detail about this).

Stateful Filters: These were the second type of firewall to be developed. 1989, AT&T Bell Laboratries.

This is similar to the first generation packet filter firewalls but goes one level higher on the OSI reference model meaning that it can now discern the state of a packet, (whether it is the start of new connection, not part of a connection etc.) by holding onto packets until enough information can be gathered about their state to allow more precise filtering of the packets. Connection state can be used in addition to rules used in simple packet filters.

The name for this style of firewall is due to the fact that the state of a packet can be taken when examining the packet.

The above two types of firewall are both examples of Network layer firewalls. Blocking from the local network completely. Not interacting with the programs behind them that may be on the computer directly.



Application Layer Firewalls: Third generation of firewalls mid 90's.

Instead of applying to the network like the previous generations this firewall can be configured to allow access,input and output to an application itself rather than just the network. Another difference with this firewall is that has access to any OSI layer.

Could make some diagrams of the different types of firewall and possibly have them appear move etc. based on js?


Testing github
