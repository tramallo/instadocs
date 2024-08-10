import { TextInput, View, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";

import MessageCard from "../../components/MessageCard";
import { styles } from "../../resources/styles";
import { supabase } from "../../resources/supabase";
import { useAuthContext } from "../../components/AuthContext";

export default function HomeRoute() {
  const { isAuthenticated, authenticatedUser } = useAuthContext();

  const [newMessageContent, setNewMessageContent] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [isSentMessagesLoading, setIsSentMessagesLoading] = useState(false);

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  // upload new message
  const onSendButtonPress = () => {
    if (!newMessageContent) return;

    const newMessage = {
      content: newMessageContent,
      sentBy: authenticatedUser.email,
      sentAt: new Date().toISOString(),
    };

    const postNewMessage = async () =>
      await supabase.from("messages").insert(newMessage);
    const uploadNewMessage = async () => {
      const { data, error } = await postNewMessage();

      if (error) {
        console.log("error posting message");
        console.log(error);
      } else {
        setNewMessageContent("");
      }
    };
    uploadNewMessage();
  };

  // load previously sent messages
  useEffect(() => {
    const updateSentMessages = async () => {
      setIsSentMessagesLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("sentAt", { ascending: true });
      setIsSentMessagesLoading(false);

      if (error) {
        console.log("error fetching messages");
        console.log(error);
      } else {
        setSentMessages(data.reverse());
      }
    };
    updateSentMessages();
  }, []);

  // subscribe to receive new messages in real time
  useEffect(() => {
    const handleInserts = (data) => {
      const newMessage = data.new;
      setSentMessages((sentMessages) => [newMessage, ...sentMessages]);
    };

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        handleInserts
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        style={styles.messagesList}
        data={sentMessages}
        inverted={true}
        extraData={sentMessages}
        renderItem={({ item }) => (
          <MessageCard
            key={item.id}
            content={item.content}
            sentBy={item.sentBy}
            sentAt={item.sentAt}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ backgroundColor: "white", borderRadius: 3, flex: 1 }}
          onChangeText={setNewMessageContent}
          value={newMessageContent}
          placeholder="escribe un mensaje"
          multiline={true}
        />
        <Button
          title="Enviar"
          onPress={onSendButtonPress}
          disabled={isLogoutLoading}
        />
      </View>
    </View>
  );
}
